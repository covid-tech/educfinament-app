import { Component, OnInit, Input } from '@angular/core';
import { Activitat } from 'models/models';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ColorService } from 'src/app/color.service';
import { Clipboard } from '@ionic-native/clipboard/ngx';


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
    private colorSVC: ColorService,
    private clipboard: Clipboard,
    private toast: ToastController
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
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Compartir activitat a professor',
        icon: 'barcode',
        handler: () => {
          this.clipboard.copy(this.activity.codiInvitacioProfessor);
          this.presentToast('Codi copiat. Comparteix-lo amb els professors.');
        }
      },
      {
        text: 'Compartir activitat a alumne',
        icon: 'barcode',
        handler: () => {
          this.clipboard.copy(this.activity.codiInvitacioAlumne);
          this.presentToast('Codi copiat. Comparteix-lo amb els alumnes.');
        }
      },
      {
        text: 'Cancel·la',
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

  getColor(color: string, transparent: boolean = false) {
    return this.colorSVC.getColor(color, transparent);
  }

  async presentToast(text:string) {
    const toast = await this.toast.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }


}
