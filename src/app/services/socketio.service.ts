import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Comment } from '../class/comment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket: Socket;

  constructor(private http: HttpClient) {
  }


  getPort(): Observable<any> {
    // console.log(this.http.get('http://localhost:3001/port'));
    return this.http.get('/api/port');
  }


  connect(chatId) {
    this.socket = io();
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.emit('joinChat', { chatId: chatId });
    this.socket.emit('selectMessages', {chatId});
  }

  recieveSelectMessages() {
    return new Observable((observer) => {
      this.socket.on('recieveSelectMessages', (messages) => {
        observer.next(messages);
      });
    });
  }

  recieveMessage() {
    return new Observable((observer) => {
      this.socket.on('receiveMessage', (message) => {
        observer.next(message);
      });
    });
  }

  selectMessage(chatId) {
    this.socket.emit('selectMessages', {chatId});
  }

  sendMessage(message, chatId) {
    this.socket.emit('sendMessage', {message, chatId});
  }

  recieveJoinedPlayers() {
    return new Observable((observer) => {
      this.socket.on('joinChat', (message) => {
        observer.next(message);
      });
    });
  }

  deleteComment(comment: Comment, chatId) {
    this.socket.emit('deleteComment', {comment, chatId});
  }

  recieveDeleteComment() {
    return new Observable((observer) => {
      this.socket.on('recieveDeleteComment', (message) => {
        observer.next(message);
      });
    });
  }

  updateComment(comment: Comment, chatId) {
    this.socket.emit('updateComment', {comment, chatId});
  }

  recieveUpdateComment() {
    return new Observable((observer) => {
      this.socket.on('recieveUpdateComment', (message) => {
        observer.next(message);
      });
    });
  }
}
