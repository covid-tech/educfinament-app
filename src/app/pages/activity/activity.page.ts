import { Component, OnInit } from '@angular/core';
import { AndroidPermissionService } from 'services/AndroidPermissionService';
import { ModalController } from '@ionic/angular';
import { UploadStudentVideoPage } from 'pages/upload-student-video/upload-student-video.page';
import { ActivatedRoute } from '@angular/router';
import { ActivitatManagerAPIClient } from 'services/ActivitatManagerAPIClient';
import { Activitat, User, Video, VideoItem } from 'models/models';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {

  id: number;
  activitat: Activitat;
  videoInici: Video;
  videoFi: Video;
  mostrantDetalls: boolean = false;

  videos: Video[] = [
    {
      id: 18,
      descripcio: "Descripció de l'activitat. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...",
      urlVideo: "https://educfinament.s3-us-west-2.amazonaws.com/videos/1586106774699-video.mp4",
      urlThumbnail: "https://educfinament.s3-us-west-2.amazonaws.com/videos/1586106774699-thumbnail.jpg",
      validat: false,
      enviatPer: 2,
      dataPublicacio: new Date(),
      activitat: 7,
      copsVist: 0,
      visitants: ""
    },
    {
      id: 18,
      descripcio: "Descripció de l'activitat. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...",
      urlVideo: "https://educfinament.s3-us-west-2.amazonaws.com/videos/1586106774699-video.mp4",
      urlThumbnail: "https://educfinament.s3-us-west-2.amazonaws.com/videos/1586106774699-thumbnail.jpg",
      validat: false,
      enviatPer: 2,
      dataPublicacio: new Date(),
      activitat: 7,
      copsVist: 0,
      visitants: ""
    },
    {
      id: 18,
      descripcio: "Descripció de l'activitat. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...",
      urlVideo: "https://educfinament.s3-us-west-2.amazonaws.com/videos/1586106774699-video.mp4",
      urlThumbnail: "https://educfinament.s3-us-west-2.amazonaws.com/videos/1586106774699-thumbnail.jpg",
      validat: false,
      enviatPer: 2,
      dataPublicacio: new Date(),
      activitat: 7,
      copsVist: 0,
      visitants: ""
    },
    {
      id: 18,
      descripcio: "Descripció de l'activitat. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...",
      urlVideo: "https://educfinament.s3-us-west-2.amazonaws.com/videos/1586106774699-video.mp4",
      urlThumbnail: "https://educfinament.s3-us-west-2.amazonaws.com/videos/1586106774699-thumbnail.jpg",
      validat: false,
      enviatPer: 2,
      dataPublicacio: new Date(),
      activitat: 7,
      copsVist: 0,
      visitants: ""
    },
    {
      id: 18,
      descripcio: "Descripció de l'activitat. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...",
      urlVideo: "https://educfinament.s3-us-west-2.amazonaws.com/videos/1586106774699-video.mp4",
      urlThumbnail: "https://educfinament.s3-us-west-2.amazonaws.com/videos/1586106774699-thumbnail.jpg",
      validat: false,
      enviatPer: 2,
      dataPublicacio: new Date(),
      activitat: 7,
      copsVist: 0,
      visitants: ""
    },
    {
      id: 18,
      descripcio: "Descripció de l'activitat. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...",
      urlVideo: "https://educfinament.s3-us-west-2.amazonaws.com/videos/1586106774699-video.mp4",
      urlThumbnail: "https://educfinament.s3-us-west-2.amazonaws.com/videos/1586106774699-thumbnail.jpg",
      validat: false,
      enviatPer: 2,
      dataPublicacio: new Date(),
      activitat: 7,
      copsVist: 0,
      visitants: ""
    },
    {
      id: 18,
      descripcio: "Descripció de l'activitat. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...",
      urlVideo: "https://educfinament.s3-us-west-2.amazonaws.com/videos/1586106774699-video.mp4",
      urlThumbnail: "https://educfinament.s3-us-west-2.amazonaws.com/videos/1586106774699-thumbnail.jpg",
      validat: false,
      enviatPer: 2,
      dataPublicacio: new Date(),
      activitat: 7,
      copsVist: 0,
      visitants: ""
    },
    {
      id: 18,
      descripcio: "Descripció de l'activitat. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...",
      urlVideo: "https://educfinament.s3-us-west-2.amazonaws.com/videos/1586106774699-video.mp4",
      urlThumbnail: "https://educfinament.s3-us-west-2.amazonaws.com/videos/1586106774699-thumbnail.jpg",
      validat: false,
      enviatPer: 2,
      dataPublicacio: new Date(),
      activitat: 7,
      copsVist: 0,
      visitants: ""
    },

  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private activitatsAPI: ActivitatManagerAPIClient,
    // private androidPermissions: AndroidPermissionService,
    public modalController: ModalController) {
  }

  ngOnInit() {
    // this.androidPermissions.requestNecessaryPermissions().then(() => {

    // });
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
      let videoItem: Video = data.data.video;
    }
  }
  
}
