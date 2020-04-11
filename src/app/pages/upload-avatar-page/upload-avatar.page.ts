import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { EducfinamentUploadAvatar } from 'classes/educfinament.upload.avatar.class';
import { cloudCredentials } from 'environments/cloud.credentials.prod';

@Component({
  selector: 'app-upload-avatar-page',
  templateUrl: './upload-avatar.page.html',
  styleUrls: ['./upload-avatar.page.scss'],
})
export class UploadAvatarPage implements OnInit {

  public isUploadingAvatar: Boolean = false;
  public isAvatarUploaded: Boolean = false;
  public avatarUrl: string = "https://educfinament.s3-us-west-2.amazonaws.com/avatars/default.jpg";
  private loadingIndicator: any;
  private imageCapture: EducfinamentUploadAvatar;

  constructor(private alertController: AlertController, public loadingController: LoadingController, public modalController: ModalController) {
    this.imageCapture = new EducfinamentUploadAvatar(cloudCredentials);
  }

  ngOnInit() {
    setTimeout(() => { this.getImageFromLibrary(); }, 1000);
  }

  async publishAvatar() {
    await this.modalController.dismiss({ avatarUrl: this.avatarUrl });
  }

  async cancelAvatar() {
    await this.modalController.dismiss();
  }

  public getImageFromLibrary() {

    this.imageCapture.getImageFromLibrary(async () => {
      this.isUploadingAvatar = true;
      await this.showLoaderIndicator("Processant avatar...");
    }).then((_avatarUrl) => {
      this.avatarUrl = _avatarUrl;
      this.isAvatarUploaded = true;
      this.isUploadingAvatar = false;
      this.hideLoaderIndicator(1500);
    }, (error) => {
      this.hideLoaderIndicator();
      //this.showAlert("ERROR: " + error);
      this.isUploadingAvatar = false;
      this.cancelAvatar();
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
    } else if (this.loadingIndicator) {
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
