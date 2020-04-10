import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { VideoItem } from 'models/models';
import { cloudCredentials } from 'environments/cloud.credentials.prod';
import { EducfinamentVideoCapture } from 'classes/educfinament.video.capture.class';

@Component({
  selector: 'app-upload-student-video',
  templateUrl: './upload-student-video.page.html',
  styleUrls: ['./upload-student-video.page.scss'],
})
export class UploadStudentVideoPage implements OnInit {

  public video: VideoItem;
  public isTranscodingVideo: Boolean = false;
  public isUploadingVideo: Boolean = false;
  public isVideoUploaded: Boolean = false;
  public videoData: VideoItem;
  public videoForm: FormGroup;
  private loadingIndicator: any;
  private videoCapture: EducfinamentVideoCapture;

  constructor(public formBuilder: FormBuilder, private route: ActivatedRoute, private alertController: AlertController, public loadingController: LoadingController) {
    this.videoCapture = new EducfinamentVideoCapture(cloudCredentials);
    this.videoForm = this.createVideoForm();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      switch(params["source"]) {
        case "library": setTimeout(() => { this.getVideoFromLibrary(); }, 1000); break;
        case "camera": setTimeout(() => { this.getVideoFromCamera(); }, 1000); break;
      }
    });
  }

  private createVideoForm() {
    return new FormGroup({
      description: new FormControl('', Validators.required),
    });
  }

  public getVideoFromCamera() {

    this.videoCapture.getVideoFromCamera(() => {
      this.isTranscodingVideo = true;
    }, ()=> {
      this.isUploadingVideo = true;
    }).then((data) => {
      this.videoData = {
        author: "Albert Nadal Garriga",
        description: "Descripció de l'activitat. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...",
        validated: false,
        videoType: "video/mp4",
        videoURL: data.videoUrl,
        thumbnailURL: data.thumbnailUrl,
        isAnswer: false
      };
      this.isTranscodingVideo = false;
      this.isUploadingVideo = false;
      this.isVideoUploaded = true;
    }, (error) => {
      this.showAlert("ERROR: " + error.message);
      this.isTranscodingVideo = false;
      this.isUploadingVideo = false;
    });
  }

  public getVideoFromLibrary() {

    this.videoCapture.getVideoFromLibrary( async () => {
      this.isTranscodingVideo = true;
      this.showLoaderIndicator("Codificant vídeo...");
    }, async ()=> {
      this.isUploadingVideo = true;
      await this.hideLoaderIndicator();
      this.showLoaderIndicator("Desant vídeo...");
    }).then((data) => {
      this.videoData = {
        author: null,
        description: null,
        validated: false,
        videoType: "video/mp4",
        videoURL: data.videoUrl,
        thumbnailURL: data.thumbnailUrl,
        isAnswer: false
      };

      this.isVideoUploaded = true;
      this.isTranscodingVideo = false;
      this.isUploadingVideo = false;
      this.hideLoaderIndicator(1500);
    }, (error) => {
      this.hideLoaderIndicator();
      this.showAlert("ERROR: " + error.message);
      this.isTranscodingVideo = false;
      this.isUploadingVideo = false;
    });
  }

  async showLoaderIndicator(msg: string) {
    this.loadingIndicator = await this.loadingController.create({
      message: msg
    });
    await this.loadingIndicator.present();
  }

  async hideLoaderIndicator(delay: number = 0) {
    if(delay) {
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
