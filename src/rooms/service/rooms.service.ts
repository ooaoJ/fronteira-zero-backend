import { Injectable } from '@nestjs/common';
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
    ) { }

    private maxPlayersForMode(mode: RoomMode) {
        return mode === RoomMode.BLITZ ? 10 : 20;
    }

    private async ensureWaitingRoom(mode: RoomMode) {
        const waitingCount = await this.roomRepository.count({
            where: { mode, status: RoomStatus.WAITING },
        });

        if (waitingCount === 0) {
            const room = this.roomRepository.create({
                mode,
                status: RoomStatus.WAITING,
                maxPlayers: this.maxPlayersForMode(mode),
            });

            await this.roomRepository.save(room);
        }
    }

    async listWaitingRooms(mode: RoomMode) {
        await this.ensureWaitingRoom(mode);

        return this.roomRepository.find({
            where: { mode, status: RoomStatus.WAITING },
            relations: ['players'],
            order: { createdAt: 'ASC' },
        });
    }

    async joinRoom(userId: string, mode: RoomMode) {
        await this.ensureWaitingRoom(mode);

        const rooms = await this.roomRepository.find({
            where: { mode, status: RoomStatus.WAITING },
            relations: ['players'],
            order: { createdAt: 'ASC' },
        });

        let room = rooms.find((r) => r.players.length < r.maxPlayers);

        if (!room) {
            room = this.roomRepository.create({
                mode,
                status: RoomStatus.WAITING,
                maxPlayers: this.maxPlayersForMode(mode),
            });

            await this.roomRepository.save(room);
        }

        const existing = await this.roomPlayerRepository.findOne({
            where: { roomId: room.id, userId },
        });

        if (!existing) {
            const roomPlayer = this.roomPlayerRepository.create({
                roomId: room.id,
                userId,
            });

            await this.roomPlayerRepository.save(roomPlayer);
        }

        const updatedRoom = await this.roomRepository.findOne({
            where: { id: room.id },
            relations: ['players'],
        });

        if (!updatedRoom) {
            throw new Error('Room not found after join');
        }

        // se encheu, inicia
        if (updatedRoom.players.length >= updatedRoom.maxPlayers) {
            updatedRoom.status = RoomStatus.STARTED;
            updatedRoom.startedAt = new Date();
            await this.roomRepository.save(updatedRoom);
        }

        return updatedRoom;
    }
}