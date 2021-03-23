//ユーザーが入力した入力値をRESTAPI URLに渡し、出力を返します。

import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { IpService } from './ip.service';

import { Read } from '../class/read';
import { Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniqueService {

  constructor(public http: HttpClient) { }
  ip=IpService.getIPAddress()

  checkUserName(username) {
    return new Promise(resolve => {
    // console.log(this.ip+'validate/check-username.php?username='+username);
      let data={username:username};
      this.http.get<string>(
        this.ip+'chat-CRUD/validate/check-username.php?username='+username,
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
          responseType: 'json'
        }
     ).subscribe(
        res => { resolve(res) },//send success response
        (err) => { resolve(false) }//send error response
      );

    });
  }

  readComments(): Observable<Read[]>{
    return this.http.get<Read[]>(`${this.ip}chat-CRUD/read.php`);
  }

  createComment(comments: Read): Observable<Read>{
    console.log(comments);
    // console.log(this.http.post<Read>(`${this.ip}chat-CRUD/create.php`, comments));
    return this.http.post<Read>(`${this.ip}chat-CRUD/create.php`, comments);
  }

  updateComment(read: Read){
    console.log(read);
    return this.http.put<Read>(`${this.ip}chat-CRUD/update.php`, read);
  }

  deleteComment(id: number){
    return this.http.delete<Read>(`${this.ip}chat-CRUD/delete.php/?id=${id}`);
  }
}
