import { Component, OnInit } from '@angular/core';
import { Activitat, User, Video } from 'models/models';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UploadActivityVideoPage } from 'pages/upload-activity-video/upload-activity-video.page';
import { ActivitatManagerAPIClient } from 'services/ActivitatManagerAPIClient';

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.page.html',
  styleUrls: ['./new-activity.page.scss'],
})
export class NewActivityPage implements OnInit {

  id: number;
  activitat: Activitat;
  mostrantDetalls: boolean = false;
  user: User;

  public videoIniciThumbnailUrl: string = "../../../assets/imatges/add_video_btn.jpg";
  public videoFinalThumbnailUrl: string = "../../../assets/imatges/add_video_btn.jpg";

  constructor(
    private router: Router,
    private activityMgr: ActivitatManagerAPIClient,
    private activatedRoute: ActivatedRoute,
    private activitatsAPI: ActivitatManagerAPIClient,
    private modalController: ModalController
  ) {

    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {

      this.activitatsAPI.obtenirActivitat(this.id)
        .subscribe((res: Activitat) => {
        this.activitat = res;
        this.videoIniciThumbnailUrl = this.activitat.imatgeVideoInici || "../../../assets/imatges/add_video_btn.jpg";
        this.videoFinalThumbnailUrl = this.activitat.imatgeVideoFi || "../../../assets/imatges/add_video_btn.jpg";
      });

    } else {
      this.activitat = {
        id: null,
        titol: "",
        objectius: "",
        videos: [],
        videoInici: null,
        dataPublicacio: null,
        dataFinalitzacio: null,
        publicada: false,
        color: 'vermell',
        grup: null,
        imatgeVideoInici: null,
        materials: null,
        criteriAvaluacioMoltBe: null,
        criteriAvaluacioBe: null,
        criteriAvaluacioFluix: null,
        criteriAvaluacioNoAssolit: null,
        imatgeVideoFi: null,
        observacionsFi: null,
        calValidacio: true,
        copsVista: 0,
        visitants: [],
        videoFi: null,
        codiInvitacioProfessor: null,
        codiInvitacioAlumne: null,
        esPrivada: false,
        professors: [],
        socProfessor: true,
        descripcio: ""
      };
      if (this.router.getCurrentNavigation().extras.state) {
        this.activitat.grup = this.router.getCurrentNavigation().extras.state.grup;
        this.activitat.professors.push(this.router.getCurrentNavigation().extras.state.professor);
      } else {
        console.log("TODO: Msg hi ha hagut un problema al obtenir les dades del grup")
      }
    }

  }

  ngOnInit() {}

  creaActivitat() {

    if (this.activitat.id) {
      this.activityMgr.modificaActivitat(this.activitat)
        .subscribe(
          res => {
            this.router.navigate(['activity', this.activitat.id]);
          },
          err => { console.log("ERR: ", err) },
        );
    } else {
      this.activityMgr.creaActivitat(this.activitat)
        .subscribe(
          res => {
            this.router.navigate(['home']);
          },
          err => { console.log("ERR: ", err) },
        );
    }

  }

  async showModalUploadVideoInici() {
    const modal = await this.modalController.create({
      component: UploadActivityVideoPage,
      componentProps: {}
    });

    modal.present();
    let data: any = await modal.onWillDismiss();
    if (data.data.hasOwnProperty('video')) {
      this.activitat.videoInici = data.data.video;
      this.activitat.imatgeVideoInici = data.data.video.urlThumbnail;
      this.videoIniciThumbnailUrl = data.data.video.urlThumbnail;
    }
  }

  async showModalUploadVideoFinal() {
    const modal = await this.modalController.create({
      component: UploadActivityVideoPage,
      componentProps: {}
    });

    modal.present();
    let data: any = await modal.onWillDismiss();
    if (data.data.hasOwnProperty('video')) {
      this.activitat.videoFi = data.data.video;
      this.activitat.imatgeVideoFi = data.data.video.urlThumbnail;
      this.videoFinalThumbnailUrl = data.data.video.urlThumbnail;
    }
  }

}
