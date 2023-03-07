import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MessageDto } from './events.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: MessageDto,
    @ConnectedSocket() client: Socket,
  ): void {
    /**
     * do things with message
     * */
    const clientId: string = client.id;
    console.log('🚀 ~ file: events.gateway.ts:25 ~ clientId:', clientId);
    console.log('🚀 ~ file: events.gateway.ts:26 ~ message:', message);

    client.emit('message', `Message '${message.data}' received`);
  }
}
