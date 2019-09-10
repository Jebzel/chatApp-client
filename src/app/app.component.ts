import { Component, OnInit } from '@angular/core';
import { ChatService } from './_services/chat.service';
import * as moment from 'moment';
import { distinctUntilChanged, filter, skipWhile, scan, takeWhile, throttleTime } from 'rxjs/operators';
import { Message } from './_models/message';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'chatApp';
  message: Message = new Message();

  messages: any[] = [];
  secretCode: string;
  endConversationCode: string;
  username: string;
  users = [];
  index = 0;
  constructor(private chatService: ChatService) {
    this.secretCode = 'DONT TELL';
    this.endConversationCode = 'BYE BYE';
  }

  sendMessage() {
    this.index++;
    this.chatService.sendMessage(this.message);
    this.message.clear();

  }
  addUser() {
    this.chatService.addUser(this.username);
  }
  ngOnInit() {
    this.chatService
      .getMessages()
      .pipe(
        distinctUntilChanged(),
        filter((message) => message.text.trim().length > 0),
        throttleTime(1000),
        takeWhile((message) => message.text !== this.endConversationCode),
        // skipWhile(() => this.username !== null),
        // scan((message: any, index: number) =>
        //   // `${message.text}(${index + 1})`
        //   message.index = index++
        // ),
      )
      .subscribe((message: Message) => {
        const currentTime = moment().format('hh:mm:ss a');

        if (message.text.trim().substring(0, 7).toLowerCase() !== '/stock=') {
          // tslint:disable-next-line: max-line-length
          const newMessage = new Message(message.text, message.user ? message.user : (this.username ? this.username : 'Unknown'), this.index, currentTime);
          this.messages.push(newMessage);
          if (this.messages.length > 50) { /* Mantain the messages to 50 */
            this.messages.splice(0, 1);
          }
        }
      });
    this.chatService.getUsers().pipe().subscribe((users) => this.users = users);
  }

}


