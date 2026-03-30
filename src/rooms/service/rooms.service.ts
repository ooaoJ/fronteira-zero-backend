import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository, IsNull } from 'typeorm'

import { Room, RoomMode, RoomStatus } from '../model/room.model'
import { RoomPlayer } from 'src/room_player/model/room-player.model'
import { Resource } from 'src/resources/model/resource.model'
import { PlayerResourceRepository } from 'src/player_resource/repository/player_resource.repository'
import { PlayerResourceService } from 'src/player_resource/service/player_resource.service'
import { RoomPlayerStatsService } from 'src/room_player_stats/service/room_player_stats.service'

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,

    @InjectRepository(RoomPlayer)
    private readonly roomPlayerRepository: Repository<RoomPlayer>,

    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,

    private readonly playerResourcService: PlayerResourceService,

    private readonly roomPlayerStatsService: RoomPlayerStatsService
  ) { }

  private maxPlayersForMode(mode: RoomMode) {
    return mode === RoomMode.BLITZ ? 10 : 20
  }

  async listMyRooms(userId: string) {
    const memberships = await this.roomPlayerRepository.find({
      where: { userId, leftAt: IsNull() },
      order: { createdAt: 'DESC' },
    })

    if (memberships.length === 0) return []

    const roomIds = memberships.map((m) => m.roomId)

    const rooms = await this.roomRepository.find({
      where: { id: In(roomIds) },
      relations: ['players'],
      order: { createdAt: 'DESC' },
    })

    // manter ordem igual do memberships (mais recentes primeiro)
    const orderMap = new Map(roomIds.map((id, idx) => [id, idx]))
    rooms.sort((a, b) => (orderMap.get(a.id) ?? 0) - (orderMap.get(b.id) ?? 0))

    return rooms
  }

  private async ensureJoinableWaitingRoom(mode: RoomMode) {
    const anyJoinable = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoin('room.players', 'players', 'players.leftAt IS NULL')
      .where('room.mode = :mode', { mode })
      .andWhere('room.status = :status', { status: RoomStatus.WAITING })
      .select('room.id', 'id')
      .addSelect('room.maxPlayers', 'maxPlayers')
      .groupBy('room.id')
      .addGroupBy('room.maxPlayers')
      .having('COUNT(players.id) < room.maxPlayers')
      .limit(1)
      .getRawOne()

    if (!anyJoinable) {
      const room = this.roomRepository.create({
        mode,
        status: RoomStatus.WAITING,
        maxPlayers: this.maxPlayersForMode(mode),
      })
      await this.roomRepository.save(room)
    }
  }

  async listWaitingRooms(mode: RoomMode) {
    await this.ensureJoinableWaitingRoom(mode)

    const rawIds = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoin('room.players', 'players', 'players.leftAt IS NULL')
      .where('room.mode = :mode', { mode })
      .andWhere('room.status = :status', { status: RoomStatus.WAITING })
      .select('room.id', 'id')
      .addSelect('room.maxPlayers', 'maxPlayers')
      .groupBy('room.id')
      .addGroupBy('room.maxPlayers')
      .having('COUNT(players.id) < room.maxPlayers')
      .orderBy('room.createdAt', 'ASC')
      .getRawMany()

    const ids = rawIds.map((r) => r.id).filter(Boolean)
    if (ids.length === 0) return []

    const rooms = await this.roomRepository.find({
      where: { id: In(ids) },
      relations: ['players'],
      order: { createdAt: 'ASC' },
    })

    const orderMap = new Map(ids.map((id, idx) => [id, idx]))
    rooms.sort((a, b) => (orderMap.get(a.id) ?? 0) - (orderMap.get(b.id) ?? 0))

    return rooms
  }

  async joinRoomByRoomId(userId: string, roomId: string) {
    const room = await this.roomRepository.findOne({
      where: { id: roomId },
      relations: ['players'],
    })
    if (!room) throw new NotFoundException('Room not found')

    const existing = await this.roomPlayerRepository.findOne({
      where: { roomId: room.id, userId },
    })
    if (existing && !existing.leftAt) {
      return room
    }

    if (room.status !== RoomStatus.WAITING) {
      throw new BadRequestException('Room is not joinable')
    }

    const activePlayers = (room.players || []).filter((p) => !p.leftAt)
    if (activePlayers.length >= room.maxPlayers) {
      throw new BadRequestException('Room is full')
    }

    if (!existing) {
      const resources = await this.resourceRepository.find();

      const rp = this.roomPlayerRepository.create({
        roomId: room.id,
        userId,
        leftAt: null as any,
      })

      await this.roomPlayerRepository.save(rp)

      await this.roomPlayerStatsService.createRoomPlayerStats({ room_player: rp });

      for (const resource of resources) {
        await this.playerResourcService.createPlayerResource({ roomPlayer: rp, resouerce: resource });
      }

    } else {
      existing.leftAt = null as any
      await this.roomPlayerRepository.save(existing)
    }

    const updatedRoom = await this.roomRepository.findOne({
      where: { id: room.id },
      relations: ['players'],
    })
    if (!updatedRoom) throw new Error('Room not found after join')

    const updatedActivePlayers = (updatedRoom.players || []).filter((p) => !p.leftAt)

    if (updatedActivePlayers.length >= updatedRoom.maxPlayers) {
      updatedRoom.status = RoomStatus.STARTED
      updatedRoom.startedAt = new Date()
      await this.roomRepository.save(updatedRoom)
    }

    return updatedRoom
  }
}