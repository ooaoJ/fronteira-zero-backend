import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: true, credentials: true },
})
export class AlliancesGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('alliance:join')
  async onJoinAlliance(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: { allianceId: string },
  ) {
    const roomName = `alliance:${body.allianceId}`;
    await socket.join(roomName);
    return { ok: true };
  }

  emitNewMessage(allianceId: string, payload: any) {
    this.server.to(`alliance:${allianceId}`).emit('alliance:new_message', payload);
  }

  emitMembersUpdated(allianceId: string, payload: any) {
    this.server.to(`alliance:${allianceId}`).emit('alliance:members_updated', payload);
  }
}