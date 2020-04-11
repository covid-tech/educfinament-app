import { Component, OnInit } from '@angular/core';
import { AndroidPermissionService } from 'services/AndroidPermissionService';
import { /*AlertController,*/ ModalController } from '@ionic/angular';
import { UploadStudentVideoPage } from 'pages/upload-student-video/upload-student-video.page';
import { VideoItem } from 'models/models';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {

  public newVideoDataString: string;

  constructor(private androidPermissions: AndroidPermissionService/*, private alertController: AlertController*/, public modalController: ModalController) { }

  ngOnInit() {
    this.androidPermissions.requestNecessaryPermissions().then(() => {

    });
  }

  async showModalUploadVideo() {
    const modal = await this.modalController.create({
      component: UploadStudentVideoPage,
      componentProps: {}
    });

    modal.present();
    let data: any = await modal.onWillDismiss();
    if(data.data.hasOwnProperty('video')) {
      // TODO: Call proper API endpoint to save the video data
      let videoItem: VideoItem = data.data.video;
      this.newVideoDataString = JSON.stringify(videoItem);
    }
  }

/*  async showAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: '',
      message: msg,
      buttons: ['OK']
    });

    alert.present();
  }*/
}
