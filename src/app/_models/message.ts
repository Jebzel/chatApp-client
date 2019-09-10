export class Message {
  public text: string;
  public user: string;
  public index: number;
  public date: string;
  constructor(text: string = null, user: string = null, index: number = null, date: string = null) {
    this.text = text;
    this.user = user;
    this.index = index;
    this.date = date;
  }
  clear() {
    this.text = null;
    this.user = null;
    this.index = null;
    this.date = null;
  }
}
