import { Component, OnInit, Input } from '@angular/core';
import { Activitat } from 'models/models';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss'],
})
export class ActivityItemComponent implements OnInit {

  @Input('activity') activity: Activitat;
  @Input('max-users') maxUsers: number = 5;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private router: Router
  ) { }

  ngOnInit() { }

  extraUsersText() {
    return `+${this.activity.participants.length - this.maxUsers}`;
  }

  firstUsers() {

    if (this.activity.participants) {
      let qty = this.activity.participants.length > this.maxUsers ? this.maxUsers : this.activity.participants.length;
      return this.activity.participants.slice(0, qty);
    } else {
      return [];
    }

  }

  getColor(transparent: boolean = false) {

    switch (this.activity.color) {
      case 'yellow':
        return transparent ? 'rgba(243, 196, 79, 0.5)' : '#f3c34c';
      case 'blue':
        return transparent ? 'rgba(56, 175, 174, 0.5)' : '#38afae';
      case 'red':
        return transparent ? 'rgba(239, 74, 61, 0.5)' : '#ef4a3d';
      case 'purple':
        return transparent ? 'rgba(127, 133, 215, 0.5)' : '#7f85d7';
      case 'pink':
        return transparent ? 'rgba(239, 72, 145, 0.5)' : '#ef4891';
      default:
        let colors = ['yellow', 'blue', 'red', 'purple', 'pink'];
        var randomIndex = Math.floor(Math.random() * colors.length); // color aleatori
        this.activity.color = colors[randomIndex];
        return this.getColor(transparent);
    }

  }

  async obreOpcions(ev) {

    ev.stopPropagation();

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Albums',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  goToActivity() {
    this.router.navigate(['activity', this.activity.id]);
  }

}
