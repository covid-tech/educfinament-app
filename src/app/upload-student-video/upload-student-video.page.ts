import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
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
  public isProcessingVideo: Boolean = false;
  public isVideoUploaded: Boolean = false;
  private videoCapture: EducfinamentVideoCapture;
  public videoData: VideoItem;
  public videoForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private route: ActivatedRoute, private alertController: AlertController) {
    this.videoCapture = new EducfinamentVideoCapture(cloudCredentials);
    this.videoForm = this.createVideoForm();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      switch(params["source"]) {
        case "library": this.getVideoFromLibrary(); break;
        case "camera": this.getVideoFromCamera(); break;
      }
    });
  }

  private createVideoForm() {
    return new FormGroup({
      description: new FormControl('', Validators.required),
    });
  }

  public getVideoFromCamera() {
    this.isProcessingVideo = true;

    this.videoCapture.getVideoFromCamera().then((data) => {
      this.showAlert("VIDEO URL: " + data.videoUrl);
      this.showAlert("THUMBNAIl URL: " + data.thumbnailUrl);
      this.videoData = {
        author: "Albert Nadal Garriga",
        description: "Descripció de l'activitat. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...",
        validated: false,
        videoType: "video/mp4",
        videoURL: data.videoUrl,
        thumbnailURL: data.thumbnailUrl,
        isAnswer: false
      };
      this.isProcessingVideo = false;
      this.isVideoUploaded = true;
    }, (error) => {
      this.showAlert("ERROR: " + error.message);
      this.isProcessingVideo = false;
    });
  }

  public getVideoFromLibrary() {
    this.isProcessingVideo = true;

    this.videoCapture.getVideoFromLibrary().then((data) => {
      this.showAlert("VIDEO URL: " + data.videoUrl);
      this.showAlert("THUMBNAIl URL: " + data.thumbnailUrl);
      this.videoData = {
        author: "Albert Nadal Garriga",
        description: "Descripció de l'activitat. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...",
        validated: false,
        videoType: "video/mp4",
        videoURL: data.videoUrl,
        thumbnailURL: data.thumbnailUrl,
        isAnswer: false
      };
      this.isProcessingVideo = false;
      this.isVideoUploaded = true;
    }, (error) => {
      this.showAlert("ERROR: " + error.message);
      this.isProcessingVideo = false;
    });
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
