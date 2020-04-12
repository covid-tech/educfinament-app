import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Video } from 'models/models';
import { cloudCredentials } from 'environments/cloud.credentials.prod';
import { EducfinamentVideoCapture } from 'classes/educfinament.video.capture.class';
import { VideoManagerAPIClient } from 'services/VideoManagerAPIClient';
import { AuthService } from 'services/auth/auth.service';

@Component({
  selector: 'app-upload-activity-video',
  templateUrl: './upload-activity-video.page.html',
  styleUrls: ['./upload-activity-video.page.scss'],
})
export class UploadActivityVideoPage implements OnInit {

  public isTranscodingVideo: Boolean = false;
  public isUploadingVideo: Boolean = false;
  public isVideoUploaded: Boolean = false;
  public videoData: Video;
  private loadingIndicator: any;
  private videoCapture: EducfinamentVideoCapture;

  constructor(private alertController: AlertController, public loadingController: LoadingController, public modalController: ModalController, private videoMgr: VideoManagerAPIClient, private auth: AuthService) {
    this.videoCapture = new EducfinamentVideoCapture(cloudCredentials);
  }

  ngOnInit() {
    setTimeout(() => { this.showMessageAndGetVideoFromLibrary(); }, 1000);
  }

  async publishVideo() {
    await this.modalController.dismiss({ video: this.videoData });
  }

  async cancelVideo() {
    await this.modalController.dismiss();
  }

  async showMessageAndGetVideoFromLibrary() {
    const alert = await this.alertController.create({
      header: 'Seleccionar vídeo',
      message: "A continuació és mostrarà la galeria de vídeos del teu dispositiu. Selecciona el vídeo per a l'activitat.",
      buttons: [
        {
          text: 'Continuar',
          handler: () => {
            this.getVideoFromLibrary();
          }
        }
      ]
    });

    await alert.present();
  }

  public getVideoFromLibrary() {
    this.videoCapture.getVideoFromLibrary(async () => {
      this.isTranscodingVideo = true;
      await this.showLoaderIndicator("Codificant vídeo...");
    }, async () => {
      this.isUploadingVideo = true;
      await this.hideLoaderIndicator();
      await this.showLoaderIndicator("Desant vídeo...");
    }).then((data) => {

      let _videoData : Video = {
        id: null,
        descripcio: "",
        urlVideo: data.videoUrl,
        urlThumbnail: data.thumbnailUrl,
        validat: false,
        enviatPer: this.auth.getUser(),
        dataPublicacio: new Date(),
        activitat: 0,
        copsVist: 0,
        visitants: "",
        avaluacio: null
      };

      this.videoMgr.creaVideo(_videoData)
        .subscribe(
          (_video: Video) => {
            this.videoData = _video;
            this.isVideoUploaded = true;
            this.isTranscodingVideo = false;
            this.isUploadingVideo = false;
            this.hideLoaderIndicator(1500);
          },
          err => {
            this.hideLoaderIndicator();
            this.isTranscodingVideo = false;
            this.isUploadingVideo = false;
            this.cancelVideo();
          },
      );


    }, (error) => {
      this.hideLoaderIndicator();
      //this.showAlert("ERROR: " + error);
      this.isTranscodingVideo = false;
      this.isUploadingVideo = false;
      this.cancelVideo();
    });
  }

  async showLoaderIndicator(msg: string) {
    this.loadingIndicator = await this.loadingController.create({
      message: msg
    });
    await this.loadingIndicator.present();
  }

  async hideLoaderIndicator(delay: number = 0) {
    if (delay) {
      setTimeout(() => { this.loadingIndicator.dismiss(); }, delay);
    } else {
      this.loadingIndicator.dismiss();
    }
  }

  async showAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: '',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}
