import * as io from 'socket.io-client';
import { Observable } from 'rxjs/internal/Observable';

export class ChatService {
    private url = 'http://localhost:3000';
    private socket;

    constructor() {
        this.socket = io(this.url);
    }

    public addUser(username: string) {       
         this.socket.emit('user-name', username);
    }

    public getUsers(): Observable<any> {
        return new Observable((observer) => {
            this.socket.on('user-name', (user) => {
                observer.next(user);
            });
        });
    }
    public sendMessage(message) {
        console.log(message);
        this.socket.emit('new-message', message);
    }

    public getMessages(): Observable<any> {
        return new Observable((observer) => {
            this.socket.on('new-message', (message) => {
                observer.next(message);
            });
        });
    }
}
