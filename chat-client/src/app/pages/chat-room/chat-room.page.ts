import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MessagesService } from '../../services/messages.service'; // <1>
import { RoomsService } from '../../services/rooms.service';
import { Room } from '../../models/room';
import { Message } from '../../models/message';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage implements OnInit, OnDestroy {
  messages: Message[] = [];
  nickname = '';
  message = '';
  room: Room = {};

  subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private socket: Socket,
              private toastCtrl: ToastController,
              private messagesService: MessagesService,
              private roomsService: RoomsService) { } // <2>

  ngOnInit() {
    this.nickname = sessionStorage.getItem('nickname'); // <3>

    this.subscription = this.route.params.subscribe(params => {
      const roomId = params.roomId; // <4>
      this.socket.emit('enter-chat-room', {roomId, nickname: this.nickname}); // <5>
      this.roomsService.findById(roomId).subscribe(room => { // <6>
        this.room = room; // <7>
        this.messagesService.find({where: JSON.stringify({room: this.room._id})}).subscribe(messages => { // <8>
          this.messages = messages; // <9>
        });
      });
    });

    this.socket.on('message', message => this.messages.push(message));

    this.socket.on('users-changed', data => {
      const user = data.user;
      if (data.event === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });

  }

  ngOnDestroy() { // <10>
    this.subscription.unsubscribe();
    this.socket.removeAllListeners('message');
    this.socket.removeAllListeners('users-changed');
    this.socket.emit('leave-chat-room', {roomId: this.room._id, nickname: this.nickname});
  }

  sendMessage() {
    this.socket.emit('add-message', {text: this.message, room: this.room._id}); // <11>
    this.message = '';
  }

  async showToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
