import { Component, OnInit } from '@angular/core';
import { Activitat } from 'models/models';

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
    participants: [],
    videoFi: null,
    codiInvitacioProfessor: null,
    codiInvitacioAlumne: null,
    esPrivada: false
  };

  constructor() { }

  ngOnInit() {}

}
