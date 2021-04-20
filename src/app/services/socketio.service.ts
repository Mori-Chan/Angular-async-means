import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Comment } from '../class/comment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket: Socket

  constructor() { }

  connect(chatId) {
    // this.socket = io();
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

  sendMessage(message, chatId) {
    this.socket.emit('sendMessage', {message, chatId});
    this.socket.emit('selectMessages', {chatId});
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
    this.socket.emit('selectMessages', {chatId});
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
    this.socket.emit('selectMessages', {chatId});
  }

  recieveUpdateComment() {
    return new Observable((observer) => {
      this.socket.on('recieveUpdateComment', (message) => {
        observer.next(message);
      });
    });
  }
}
