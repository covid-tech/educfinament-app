import { Component, OnInit } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { VideoEditor } from '@ionic-native/video-editor/ngx';
import { AlertController } from '@ionic/angular';
import * as AWS from 'aws-sdk';
import { cloudCredentials } from '../../environments/cloud.credentials.prod';
import { EducfinamentVideoCapture } from '../shared-classes/educfinament.video.capture.class';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public isProcessingVideo: boolean = false;
  private videoCapture: EducfinamentVideoCapture;

  constructor(private file: File, private camera: Camera, private videoEditor: VideoEditor, public alertController: AlertController) {
  }

  ngOnInit() {
    this.videoCapture = new EducfinamentVideoCapture();
  }
/*
  private getVideoAndUploadToS3(sourceType: any) {
    return new Promise(function(resolve, reject) {

      let options: CameraOptions = {
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: sourceType,
        mediaType: this.camera.MediaType.VIDEO
      }

      let uuid: string = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      let output_filename: string = (new Date().getTime()).toString() + "-" + uuid;

      this.camera.getPicture(options).then(video => {
        this.file.resolveLocalFilesystemUrl(video).then(fileEntry => {
          this.videoEditor.transcodeVideo({
            fileUri: fileEntry.fullPath,
            outputFileName: output_filename + "-video",
            outputFileType: this.videoEditor.OutputFileType.MPEG4,
            optimizeForNetworkUse: this.videoEditor.OptimizeForNetworkUse.YES,
            saveToLibrary: false
          }).then((videoFileUri: string) => {
            this.videoEditor.createThumbnail({
              fileUri: fileEntry.fullPath,
              outputFileName: output_filename + "-thumbnail",
              atTime: 2,
              width: 320,
              height: 480,
              quality: 100
            }).then((thumbnailFileUri: string) => {
              this.uploadFile(videoFileUri).then((videoKey: any) => {
                this.uploadFile(thumbnailFileUri).then((thumbnailKey: any) => {
                  resolve({ videoUrl: "https://educfinament.s3-us-west-2.amazonaws.com/"+videoKey,
                            thumbnailUrl: "https://educfinament.s3-us-west-2.amazonaws.com/"+thumbnailKey});
                }, (error: any) => {
                  reject(error);
                });
              }, (error: any) => {
                reject(error);
              });
            }).catch((error: any) => {
              reject(error);
            });
          }).catch((error: any) => {
            reject(error);
          });
        });
      }, (error: any) => {
        reject(error);
      });
    }.bind(this));
  }

  private uploadFile(filename: string) {
    return new Promise(function(resolve, reject) {
      this.file.resolveLocalFilesystemUrl("file://" + filename).then(fileEntry => {
        let path: string = filename.replace(fileEntry.name, "");

        this.file.readAsArrayBuffer("file://"+path, fileEntry.name)
          .then((videoData: ArrayBuffer) => {

            AWS.config.update(cloudCredentials);
            var config = {
              region: "us-west-2",
              useDualstack: false,
              useAccelerateEndpoint: false,
              s3ForcePathStyle: false,
              maxRetries: 0
            };

            var s3 = new AWS.S3(config);
            let key: string = "videos/"+fileEntry.name;
            s3.putObject({ Bucket: 'educfinament', Key: key, Body: videoData }, function(err, data) {
              if (err) {
                reject(err);
              } else {
                resolve(key);
              }
            }.bind(this));

          })
          .catch((error) => {
            reject(error);
          });
      }).catch((error) => {
        reject(error);
      });
    }.bind(this));
  }
*/
  public getVideoFromCamera() {
    this.isProcessingVideo = true;

    this.videoCapture.getVideoFromCamera().then((data) => {
      this.showAlert("VIDEO URL: "+data.videoUrl);
      this.showAlert("THUMBNAIL URL: "+data.thumbnailUrl)
      this.isProcessingVideo = false;
    }, (error) => {
      this.showAlert("ERROR: " + error.message);
      this.isProcessingVideo = false;
    });
  }

  public getVideoFromLibrary() {
    this.isProcessingVideo = true;

    this.videoCapture.getVideoFromLibrary().then((data) => {
      this.showAlert("VIDEO URL: "+data.videoUrl);
      this.showAlert("THUMBNAIL URL: "+data.thumbnailUrl)
      this.isProcessingVideo = false;
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
