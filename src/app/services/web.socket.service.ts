import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private stompClient: Stomp.Client | undefined;

  connect() {
    const socket = new SockJS('http://localhost:8888/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      console.log('Connected to WebSocket');
    });
  }

  subscribe(destination: string, callback: (message: Stomp.Message) => void) {
    if (this.stompClient) {
      this.stompClient.subscribe(destination, callback);
    }
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        console.log('Disconnected from WebSocket');
      });
    }
  }
}
