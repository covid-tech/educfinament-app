import { Component, OnInit } from '@angular/core';
import { Activitat, User } from 'models/models';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(
    private router: Router,
    private activityMgr: ActivitatManagerAPIClient,
    private activatedRoute: ActivatedRoute,
    private activitatsAPI: ActivitatManagerAPIClient
  ) {

    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {

      this.activitatsAPI.obtenirActivitat(this.id)
        .subscribe((res: Activitat) => {
        this.activitat = res;
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

}
