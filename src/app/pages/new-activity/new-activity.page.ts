import { Component, OnInit } from '@angular/core';
import { Activitat } from 'models/models';
import { Router } from '@angular/router';
import { ActivitatManagerAPIClient } from 'services/ActivitatManagerAPIClient';

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.page.html',
  styleUrls: ['./new-activity.page.scss'],
})
export class NewActivityPage implements OnInit {

  activitat: Activitat = {
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

  constructor(
    private router: Router,
    private activityMgr: ActivitatManagerAPIClient
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.activitat.grup = this.router.getCurrentNavigation().extras.state.grup;
      this.activitat.professors.push(this.router.getCurrentNavigation().extras.state.professor); 
    } else {
      console.log("TODO: Msg hi ha hagut un problema al obtenir les dades del grup")
    }
  }

  ngOnInit() {}

  creaActivitat() {
    this.activityMgr.creaActivitat(this.activitat)
      .subscribe(
        res => {
          this.router.navigate(['home']);
        },
        err => { console.log("ERR: ", err) },
      );
  }

}
