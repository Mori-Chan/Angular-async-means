import { Component, OnInit } from '@angular/core';
import { Read } from '../class/read';
import { UniqueService } from '../services/unique.service';
import { User } from '../class/user';
import { timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const CURRENT_USER: User = new User(2, '森井 將裕');
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  comments:  Read[];
  selectedRead:  Read  = { id :  null, date: null, message:  null, uid:  null, name:  null, initial: null };
  comment = '';
  currentUser = CURRENT_USER;

  constructor(private uniqueService: UniqueService) { }

  ngOnInit() {
    this.readComments();
  }

  readComments() {
    this.uniqueService.readComments().subscribe((comments: Read[])=>{
      this.comments = comments;
      // console.log(this.comments);
    })
  }

  createComment(comment: string) {
    let selectedRead = this.selectedRead;
    selectedRead.message = comment;
    selectedRead.initial=this.currentUser.initial;
    selectedRead.uid=this.currentUser.uid;
    selectedRead.name=this.currentUser.name;
    // console.log(this.uniqueService.createComment(selectedRead));
    this.uniqueService.createComment(selectedRead).subscribe(
        res => { console.log(res) },//send success response
        (err) => { console.log(err) }//send error response
      );;
    comment = "";
    this.readComments();
  }

  updateComment(comment: Read){
    this.uniqueService.updateComment(comment).subscribe((read: Read)=>{
      console.log("Read updated" , read);
    });
    this.readComments();
  }

  deleteComment(comment: Read): void{
    this.uniqueService.deleteComment(comment.id).subscribe((read: Read)=>{
      console.log("Read deleted, ", read);
    });
    this.readComments();
  }
}
