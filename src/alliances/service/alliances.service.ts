import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { Alliance } from '../model/alliance.model';
import { AllianceMember, AllianceRole } from '../model/alliance-member.model';
import { AllianceMessage } from '../model/alliance-message.model';
import { CreateAllianceDto } from '../dtos/create-alliance.dto';
import { SendMessageDto } from '../dtos/send-message.dto';
import { User } from '../../users/model/user.model';
import { AlliancesGateway } from '../gateway/alliances.gateway';

@Injectable()
export class AlliancesService {
  private readonly MAX_MEMBERS = 10;

  constructor(
    @InjectRepository(Alliance)
    private readonly allianceRepo: Repository<Alliance>,

    @InjectRepository(AllianceMember)
    private readonly memberRepo: Repository<AllianceMember>,

    @InjectRepository(AllianceMessage)
    private readonly messageRepo: Repository<AllianceMessage>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    private readonly gateway: AlliancesGateway,
  ) { }

  private async buildMembersPayload(allianceId: string) {
    const members = await this.memberRepo.find({ where: { allianceId } });

    const users = members.length
      ? await this.userRepo.find({ where: { id: In(members.map((m) => m.userId)) } })
      : [];

    return {
      membersCount: members.length,
      maxMembers: this.MAX_MEMBERS,
      members: users.map((u) => ({
        id: u.id,
        name: u.name,
        rank: u.rank,
        xp: u.xp ?? 0,
        avatarId: (u as any).avatarId,
      })),
    };
  }

  async getMyAlliance(userId: string) {
    const membership = await this.memberRepo.findOne({ where: { userId } });
    if (!membership) return null;

    const alliance = await this.allianceRepo.findOne({ where: { id: membership.allianceId } });
    if (!alliance) return null;

    const members = await this.memberRepo.find({ where: { allianceId: alliance.id } });

    const users = members.length
      ? await this.userRepo.find({ where: { id: In(members.map((m) => m.userId)) } })
      : [];

    const points = users.reduce((sum, u) => sum + (u.xp ?? 0), 0);

    const messages = await this.messageRepo.find({
      where: { allianceId: alliance.id },
      order: { createdAt: 'DESC' },
      take: 50,
    });

    const authorIds = [...new Set(messages.map((m) => m.userId))];
    const authors = authorIds.length
      ? await this.userRepo.find({ where: { id: In(authorIds) } })
      : [];
    const authorNameById = new Map(authors.map((a) => [a.id, a.name]));

    const messagesWithNames = messages
      .slice()
      .reverse()
      .map((m) => ({
        id: m.id,
        allianceId: m.allianceId,
        userId: m.userId,
        userName: authorNameById.get(m.userId) ?? null,
        content: m.content,
        createdAt: m.createdAt,
      }));

    return {
      alliance: {
        id: alliance.id,
        name: alliance.name,
        tag: alliance.tag,
        createdAt: alliance.createdAt,
        membersCount: members.length,
        points,
      },
      members: users.map((u) => ({
        id: u.id,
        name: u.name,
        rank: u.rank,
        xp: u.xp,
        avatarId: (u as any).avatarId,
      })),
      messages: messagesWithNames,
    };
  }

  async listAlliances() {
    const alliances = await this.allianceRepo.find({ order: { createdAt: 'ASC' } });
    if (alliances.length === 0) return [];

    const allianceIds = alliances.map((a) => a.id);

    const members = await this.memberRepo.find({
      where: { allianceId: In(allianceIds) },
    });

    const users = members.length
      ? await this.userRepo.find({ where: { id: In(members.map((m) => m.userId)) } })
      : [];

    const userXpById = new Map(users.map((u) => [u.id, u.xp ?? 0]));

    const agg = new Map<string, { membersCount: number; points: number }>();
    for (const a of alliances) agg.set(a.id, { membersCount: 0, points: 0 });

    for (const m of members) {
      const entry = agg.get(m.allianceId);
      if (!entry) continue;
      entry.membersCount += 1;
      entry.points += userXpById.get(m.userId) ?? 0;
    }

    const result = alliances.map((a) => {
      const entry = agg.get(a.id)!;
      return {
        id: a.id,
        name: a.name,
        tag: a.tag,
        createdAt: a.createdAt,
        membersCount: entry.membersCount,
        maxMembers: this.MAX_MEMBERS,
        points: entry.points,
      };
    });

    result.sort(
      (x, y) => (y.points - x.points) || (x.createdAt.getTime() - y.createdAt.getTime()),
    );

    return result;
  }

  async createAlliance(userId: string, dto: CreateAllianceDto) {
    const existingMembership = await this.memberRepo.findOne({ where: { userId } });
    if (existingMembership) throw new BadRequestException('Você já está em uma aliança.');

    const alliance = this.allianceRepo.create({
      name: dto.name.trim(),
      tag: dto.tag?.trim() ?? null,
    });

    await this.allianceRepo.save(alliance);

    const leader = this.memberRepo.create({
      allianceId: alliance.id,
      userId,
      role: AllianceRole.LEADER,
    });

    await this.memberRepo.save(leader);

    const membersPayload = await this.buildMembersPayload(alliance.id);
    this.gateway.emitMembersUpdated(alliance.id, membersPayload);

    return { id: alliance.id };
  }

  async joinAlliance(userId: string, allianceId: string) {
    const existingMembership = await this.memberRepo.findOne({ where: { userId } });
    if (existingMembership) throw new BadRequestException('Você já está em uma aliança.');

    const alliance = await this.allianceRepo.findOne({ where: { id: allianceId } });
    if (!alliance) throw new NotFoundException('Aliança não encontrada.');

    const membersCount = await this.memberRepo.count({ where: { allianceId } });
    if (membersCount >= this.MAX_MEMBERS) throw new BadRequestException('Aliança cheia.');

    const member = this.memberRepo.create({
      allianceId,
      userId,
      role: AllianceRole.MEMBER,
    });

    await this.memberRepo.save(member);

    const membersPayload = await this.buildMembersPayload(allianceId);
    this.gateway.emitMembersUpdated(allianceId, membersPayload);

    return { ok: true };
  }

  async leaveAlliance(userId: string) {
    const membership = await this.memberRepo.findOne({ where: { userId } });
    if (!membership) throw new BadRequestException('Você não está em uma aliança.');

    const allianceId = membership.allianceId;

    await this.memberRepo.delete({ id: membership.id });

    const membersPayload = await this.buildMembersPayload(allianceId);
    this.gateway.emitMembersUpdated(allianceId, membersPayload);

    return { ok: true };
  }

  async sendMessage(userId: string, dto: SendMessageDto) {
    const membership = await this.memberRepo.findOne({ where: { userId } });
    if (!membership) throw new BadRequestException('Você não está em uma aliança.');

    const content = dto.content.trim();
    if (!content) throw new BadRequestException('Mensagem vazia.');

    const msg = this.messageRepo.create({
      allianceId: membership.allianceId,
      userId,
      content,
    });

    await this.messageRepo.save(msg);

    const user = await this.userRepo.findOne({ where: { id: userId } });

    const payload = {
      id: msg.id,
      allianceId: msg.allianceId,
      userId,
      userName: user?.name ?? null,
      content: msg.content,
      createdAt: msg.createdAt,
    };

    this.gateway.emitNewMessage(membership.allianceId, payload);

    return payload;
  }
}