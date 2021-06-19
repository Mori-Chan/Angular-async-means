import { Component, OnInit } from '@angular/core';
import { Read } from '../class/read';
import { Comment } from '../class/comment';
import { UniqueService } from '../services/unique.service';
import { User } from '../class/user';
import { timer, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SocketioService } from '../services/socketio.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

const CURRENT_USER: User = new User(2, '森井 將裕');
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chatId: string;
  comments$: Comment[];
  comment = '';
  currentUser = CURRENT_USER;
  PORT;

  constructor(
    private socketIoService: SocketioService,
    private route: ActivatedRoute,
    // private snackbar: MatSnackBar,
    private uniqueService: UniqueService
  ) { }

  ngOnInit() {

    // this.chatId = this.route.snapshot.paramMap.get('id');
    this.chatId = 'chat';
    this.socketIoService.connect(this.chatId);
    this.recieveJoinedPlayers();
    this.recieveSelectMessages();
    this.recieveMessage();
    this.recieveDeleteComment();
    this.recieveUpdateComment();
  }

  recieveJoinedPlayers() {
    this.socketIoService.recieveJoinedPlayers().subscribe((message: string) => {
      // this.snackbar.open(message, '', {
      //   duration: 3000,
      // });
      console.log(message);
    })
  }

  recieveSelectMessages() {
    this.socketIoService.recieveSelectMessages().subscribe((messages: Comment[]) => {
      this.comments$ = messages;
      // console.log(this.comments$);
      // console.log(messages);
    })
  }

  recieveMessage() {
    this.socketIoService.recieveMessage().subscribe((message) => {
      console.log(message);
    })
  }


  createComment(comment: string) {
    let message = {
      date: Date(),
      message: comment,
      uid: this.currentUser.uid
    };
    this.socketIoService.sendMessage(message, this.chatId);
    comment = "";
    this.socketIoService.selectMessage(this.chatId);
  }

  deleteComment(comment: Comment) {
    this.socketIoService.deleteComment(comment, this.chatId);
    this.socketIoService.selectMessage(this.chatId);
  }

  recieveDeleteComment() {
    this.socketIoService.recieveDeleteComment().subscribe((message: string) => {
      console.log(message);
    })
  }

  updateComment(comment: Comment) {
    this.socketIoService.updateComment(comment, this.chatId);
    this.socketIoService.selectMessage(this.chatId);
  }

  recieveUpdateComment() {
    this.socketIoService.recieveUpdateComment().subscribe((message: string) => {
      console.log(message);
    })
  }
}
