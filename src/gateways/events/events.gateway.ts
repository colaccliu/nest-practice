import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Server } from "socket.io";
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@WebSocketGateway()
export class EventGateway {
    @WebSocketServer()
    server: Server;
    @SubscribeMessage('events')
    findAll(@MessageBody() data: any): Observable<WsResponse<number>>{
        console.log('This is websocket gateway...', data)
        return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item}))) 
    }

    @SubscribeMessage('identity')
    async identity(@MessageBody() data: number): Promise<number> {
        return data
    }
}