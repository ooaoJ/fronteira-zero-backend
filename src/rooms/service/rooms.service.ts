import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Room, RoomMode, RoomStatus } from '../model/room.model';
import { RoomPlayer } from '../model/room-player.model';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,

    @InjectRepository(RoomPlayer)
    private readonly roomPlayerRepository: Repository<RoomPlayer>,
  ) {}

  private maxPlayersForMode(mode: RoomMode) {
    return mode === RoomMode.BLITZ ? 10 : 20;
  }

  private async ensureJoinableWaitingRoom(mode: RoomMode) {
    const joinableCount = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoin('room.players', 'players')
      .where('room.mode = :mode', { mode })
      .andWhere('room.status = :status', { status: RoomStatus.WAITING })
      .groupBy('room.id')
      .having('COUNT(players.id) < room.maxPlayers')
      .getCount();

    if (joinableCount === 0) {
      const room = this.roomRepository.create({
        mode,
        status: RoomStatus.WAITING,
        maxPlayers: this.maxPlayersForMode(mode),
      });
      await this.roomRepository.save(room);
    }
  }

  async listWaitingRooms(mode: RoomMode) {
    await this.ensureJoinableWaitingRoom(mode);

    // só salas WAITING com vaga (lotadas não aparecem)
    return this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.players', 'players')
      .where('room.mode = :mode', { mode })
      .andWhere('room.status = :status', { status: RoomStatus.WAITING })
      .groupBy('room.id')
      .having('COUNT(players.id) < room.maxPlayers')
      .orderBy('room.createdAt', 'ASC')
      .getMany();
  }

  async joinRoomByRoomId(userId: string, roomId: string) {
    const room = await this.roomRepository.findOne({
      where: { id: roomId },
      relations: ['players'],
    });

    if (!room) throw new NotFoundException('Room not found');
    if (room.status !== RoomStatus.WAITING) throw new BadRequestException('Room is not joinable');

    if (room.players.length >= room.maxPlayers) {
      throw new BadRequestException('Room is full');
    }

    const existing = await this.roomPlayerRepository.findOne({
      where: { roomId: room.id, userId },
    });

    if (!existing) {
      const rp = this.roomPlayerRepository.create({
        roomId: room.id,
        userId,
      });
      await this.roomPlayerRepository.save(rp);
    }

    const updatedRoom = await this.roomRepository.findOne({
      where: { id: room.id },
      relations: ['players'],
    });

    if (!updatedRoom) throw new Error('Room not found after join');

    if (updatedRoom.players.length >= updatedRoom.maxPlayers) {
      updatedRoom.status = RoomStatus.STARTED;
      updatedRoom.startedAt = new Date();
      await this.roomRepository.save(updatedRoom);
    }

    return updatedRoom;
  }
}