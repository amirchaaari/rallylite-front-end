import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    const userId = localStorage.getItem('userId') || '';
    console.log(`SocketService: connecting with userId = ${userId}`);

    this.socket = io('http://localhost:3000', {
      withCredentials: true,
      transports: ['websocket'],
      query: { userId },
    });

    this.socket.on('connect', () => {
      console.log(`Socket connected with id: ${this.socket.id}`);
    });

    this.socket.on('disconnect', (reason) => {
      console.log(`Socket disconnected: ${reason}`);
    });
  }

  // Listen for join request notifications
  onJoinRequest(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('joinRequest', (data) => {
        console.log('SocketService: Received joinRequest event:', data);
        observer.next(data);
      });
    });
  }

  disconnect() {
    this.socket.disconnect();
  }
}
