import { Component, OnInit } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { VideoEditor } from '@ionic-native/video-editor/ngx';
import { AlertController } from '@ionic/angular';
import * as AWS from 'aws-sdk';
import { cloudCredentials } from '../../environments/cloud.credentials.prod';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public isProcessingVideo: boolean = false;

  constructor(private file: File, private camera: Camera, private videoEditor: VideoEditor, public alertController: AlertController) {
  }

  ngOnInit() {
  }

  public getVideo(sourceType: any) {

    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      mediaType: this.camera.MediaType.VIDEO
    }

    let output_filename_prefix: string = (new Date().getTime()).toString();

    this.camera.getPicture(options).then(video => {
      this.isProcessingVideo = true;
      this.file.resolveLocalFilesystemUrl(video).then(fileEntry => {
        this.videoEditor.transcodeVideo({
          fileUri: fileEntry.fullPath,
          outputFileName: output_filename_prefix + "-video",
          outputFileType: this.videoEditor.OutputFileType.MPEG4,
          optimizeForNetworkUse: this.videoEditor.OptimizeForNetworkUse.YES,
          saveToLibrary: false
        })
          .then((videoFileUri: string) => {
            this.videoEditor.createThumbnail({
              fileUri: fileEntry.fullPath,
              outputFileName: output_filename_prefix + "-thumbnail",
              atTime: 2,
              width: 320,
              height: 480,
              quality: 100
            }
            ).then((thumbnailFileUri: string) => {
              this.file.resolveLocalFilesystemUrl("file://" + videoFileUri).then(fileEntry => {

                let file_path: string = videoFileUri.replace(fileEntry.name, "");

                this.file.readAsArrayBuffer("file://" + file_path, fileEntry.name)
                  .then((video_data: ArrayBuffer) => {
                    AWS.config.update(cloudCredentials);

                    var config = {
                      region: "us-west-2",
                      useDualstack: false,
                      useAccelerateEndpoint: false,
                      s3ForcePathStyle: false,
                      maxRetries: 0
                    };

                    var s3 = new AWS.S3(config);
                    s3.putObject({ Bucket: 'educfinament', Key: "videos/" + output_filename_prefix + "-video.mp4", Body: video_data }, function(err, data) {
                      this.showAlert("OK!");
                      if (err) {
                        this.showAlert("UPLOAD ERROR: " + err.message);
                        this.isProcessingVideo = false;
                      } else {
                        this.showAlert("VIDEO PUJAT!");
                        this.isProcessingVideo = false;
                      }
                    }.bind(this));

                  })
                  .catch((error) => {
                    this.showAlert("NO SHA POGUT PUJAR: " + error.message);
                    this.isProcessingVideo = false;
                  });
              }).catch((error) => {
                this.showAlert("ERROR: " + error.message);
                this.isProcessingVideo = false;
              });

            })
              .catch((error: any) => {
                this.showAlert("THUMBNAIL ERROR: " + error);
                this.isProcessingVideo = false;
              });

          })
          .catch((error: any) => {
            this.showAlert("VIDEO ERROR: " + error);
            this.isProcessingVideo = false;
          });
      });
    }, (err) => {
      this.isProcessingVideo = false;
    });
  }

  public getVideoFromCamera() {
    this.getVideo(this.camera.PictureSourceType.CAMERA);
  }

  public getVideoFromLibrary() {
    this.getVideo(this.camera.PictureSourceType.PHOTOLIBRARY);
  }

  /*
      VideoEditor.transcodeVideo(
      null, // success cb
      null, // error cb
        {
            fileUri: 'file-uri-here', // the path to the video on the device
            outputFileName: 'output-name', // the file name for the transcoded video
            outputFileType: VideoEditorOptions.OutputFileType.MPEG4, // android is always mp4
            optimizeForNetworkUse: VideoEditorOptions.OptimizeForNetworkUse.YES, // ios only
            saveToLibrary: true, // optional, defaults to true
            deleteInputFile: false, // optional (android only), defaults to false
            maintainAspectRatio: true, // optional (ios only), defaults to true
            width: 640, // optional, see note below on width and height
            height: 640, // optional, see notes below on width and height
            videoBitrate: 1000000, // optional, bitrate in bits, defaults to 1 megabit (1000000)
            fps: 24, // optional (android only), defaults to 24
            audioChannels: 2, // optional (ios only), number of audio channels, defaults to 2
            audioSampleRate: 44100, // optional (ios only), sample rate for the audio, defaults to 44100
            audioBitrate: 128000, // optional (ios only), audio bitrate for the video in bits, defaults to 128 kilobits (128000)
            progress: function(info: any) {} // info will be a number from 0 to 100
        }
    );*/

  async showAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

}
