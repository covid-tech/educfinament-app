import { Component, OnInit, Input } from '@angular/core';
import { Activitat } from 'models/models';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ColorService } from 'src/app/color.service';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss'],
})
export class ActivityItemComponent implements OnInit {

  @Input('activity') activity: Activitat;
  @Input('max-videos') maxVideos: number = 5;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private colorSVC: ColorService
  ) { }

  ngOnInit() { }

  extraUsersText() {
    return `+${this.activity.videos.length - this.maxVideos}`;
  }

  firstVideos() {

    if (this.activity.videos) {
      let qty = this.activity.videos.length > this.maxVideos ? this.maxVideos : this.activity.videos.length;
      return this.activity.videos.slice(0, qty);
    } else {
      return [];
    }

  }

  async obreOpcions(ev) {

    ev.stopPropagation();

    const actionSheet = await this.actionSheetCtrl.create({
      header: this.activity.titol,
      buttons: [{
        text: 'Elimina',
        role: 'destructive',
        // icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Compartir activitat',
        // icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Cancel·la',
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

  getColor(color: string, transparent: boolean = false) {
    return this.colorSVC.getColor(color, transparent);
  }

}
