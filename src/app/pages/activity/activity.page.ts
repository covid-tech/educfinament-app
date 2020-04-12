import { Component, OnInit } from '@angular/core';
import { AndroidPermissionService } from 'services/AndroidPermissionService';
import { ModalController } from '@ionic/angular';
import { UploadStudentVideoPage } from 'pages/upload-student-video/upload-student-video.page';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ActivitatManagerAPIClient } from 'services/ActivitatManagerAPIClient';
import { Activitat, User, Video, VideoItem } from 'models/models';
import { ColorService } from 'src/app/color.service';
import { ValidacioActivitatPage } from 'components/validacio-activitat/validacio-activitat.page';
import { AuthService } from 'services/auth/auth.service';

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
  user: User;
  mostrantDetalls: boolean = false;
  videoUsuari: Video;

  constructor(
    private activatedRoute: ActivatedRoute,
    private activitatsAPI: ActivitatManagerAPIClient,
    private router: Router,
    private colorSVC: ColorService,
    private auth: AuthService,
    private androidPermissions: AndroidPermissionService,
    public modalController: ModalController) {
  }

  ngOnInit() {
    this.androidPermissions.requestNecessaryPermissions().then(() => {

    });
  }

  ionViewDidEnter() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.user = this.auth.getUser();
    this.activitatsAPI.obtenirActivitat(this.id)
      .subscribe((res: Activitat) => {
        this.activitat = res;
        if (this.activitat.videos) {
          let videos = this.activitat.videos.filter(x => x.enviatPer.id == this.user.id);
          if (videos.length > 0) this.videoUsuari = videos[0];
        }

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

  async showModalValidaActivitat(video: Video, activitat: Activitat) {
    
    console.log("video", video);
    console.log("activitat", activitat);

    const modal = await this.modalController.create({
      component: ValidacioActivitatPage,
      componentProps: {
        video: video,
        activitat: activitat
      }
    });
    modal.present();
    
    let { data }: any = await modal.onWillDismiss();
    if (data && data.hasOwnProperty('video')) {
      let index = this.activitat.videos.indexOf(video);
      this.activitat.videos[index] = data.video;
    }
    
  }

  goToEditActivity() {

    let extras: NavigationExtras = {
      state: {
        grup: this.activitat.grup,
        professor: this.user
      }
    };
    
    this.router.navigate(['new-activity', this.activitat.id], extras);
  }

  
  getColor(color: string, transparent: boolean = false) {
    return this.colorSVC.getColor(color, transparent);
  }

}
