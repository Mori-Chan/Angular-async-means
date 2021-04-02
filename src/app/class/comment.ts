import { User } from './user';

export class Comment {

  initial: string;
  id: Object;
  date: string;
  message: string;
  uid: number;
  name: string;
  temp?: string;

  constructor(value: any) {
    this.initial = value.initial;
    this.id = value._id;
    this.uid = value.uid;
    this.name = value.name;
    this.message = value.message;
    this.date = value.date || Date.now();
    this.temp = '';
  }

  // user: User;
  // message: string;
  // date: number;
  // key?: string;
  // isEdit: boolean;

  // constructor(value: any) {
  //   this.user = value.user;
  //   this.message = value.message;
  //   this.date = value.date || Date.now();
  //   if(value.key) {
  //     this.key = value._id;
  //   }
  // }

}
