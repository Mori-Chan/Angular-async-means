export  class  Read {
  initial: string;
  id: number;
  date: number;
  message: string;
  uid: number;
  name: string;
  temp?: string;

  constructor(value: any) {
    this.initial = value.initial;
    this.id = value.id;
    this.uid = value.uid;
    this.name = value.name;
    this.message = value.message;
    this.date = value.date || Date.now();
    this.temp = '';
  }
}
