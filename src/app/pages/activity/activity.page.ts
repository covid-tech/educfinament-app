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
import { VideoManagerAPIClient } from 'services/VideoManagerAPIClient';
import { FiltreRespostesService } from 'src/app/services/filtre-respostes.service';

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
    public modalController: ModalController,
    private videoMgr: VideoManagerAPIClient,
    private filtreRespostes: FiltreRespostesService,
  ) {
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
      // TODO: Fer que no calgui parseInt posant com a number les id a tot arreu
      videoItem.activitat = parseInt(this.activitat.id);
      this.videoMgr.modificaVideo(videoItem)
        .subscribe(
          res => { console.log("Funciona? ", res); },
          err => { console.log("Error? ", err); },
        );

    }
  }

  async showModalValidaActivitat(video: Video) {

    this.videoMgr.registraVisita(this.user, video).subscribe();

    const modal = await this.modalController.create({
      component: ValidacioActivitatPage,
      componentProps: {
        video: video,
        activitat: this.activitat
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

  respostesFiltrades() {
    let videos = this.filtreRespostes.obtenirRespostesFiltrades(this.activitat);
    return videos;
  }

  necessitaValidacio(video: Video) {
    let validacio = this.filtreRespostes.calValidacio(video, this.activitat);
    return validacio;
  }

}
