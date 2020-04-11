import { Component, OnInit } from '@angular/core';
import { AndroidPermissionService } from 'services/AndroidPermissionService';
import { ModalController } from '@ionic/angular';
import { UploadStudentVideoPage } from 'pages/upload-student-video/upload-student-video.page';
import { ActivatedRoute } from '@angular/router';
import { ActivitatManagerAPIClient } from 'services/ActivitatManagerAPIClient';
import { Activitat, User, VideoItem } from 'models/models';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {

  id: number;
  activitat: Activitat;
  videoInici: VideoItem;
  videoFi: VideoItem;

  constructor(
    private activatedRoute: ActivatedRoute,
    private activitatsAPI: ActivitatManagerAPIClient,
    private androidPermissions: AndroidPermissionService,
    public modalController: ModalController) {
  }

  ngOnInit() {
    this.androidPermissions.requestNecessaryPermissions().then(() => {

    });
  }

  ionViewDidEnter() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.activitatsAPI.obtenirActivitat(this.id)
      .subscribe((res: Activitat) => {

        // BORRAR: Nomes per dev
        res.videoInici = res.videos[0];
        res.videoFi = res.videos[0];
        // FI BORRAR

        this.activitat = res;
      });
  }

  async showModalUploadVideo() {
    const modal = await this.modalController.create({
      component: UploadStudentVideoPage,
      componentProps: {}
    });

    modal.present();
    let data: any = await modal.onWillDismiss();
    if (data.data.hasOwnProperty('video')) {
      // TODO: Call proper API endpoint to save the video data
      let videoItem: VideoItem = data.data.video;
    }
  }

}
