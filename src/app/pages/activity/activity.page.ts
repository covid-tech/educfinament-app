import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivitatManagerAPIClient } from 'services/ActivitatManagerAPIClient';
import { Activitat, User, VideoItem } from 'models/models';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {

  id: number;
  activitat: Activitat;

  videoInici: VideoItem;
  videoFi: VideoItem;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private activitatsAPI: ActivitatManagerAPIClient) {}
  
  ionViewDidEnter() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.activitatsAPI.obtenirActivitat(this.id)
      .subscribe((res: Activitat) => {
        
        // BORRAR: Nomes per dev
        res.videoInici = res.videos[0];
        res.videoFi = res.videos[0];
        // FI BORRAR
        
        this.activitat = res;
      });
  }

  ngOnInit() {
  }  

}
