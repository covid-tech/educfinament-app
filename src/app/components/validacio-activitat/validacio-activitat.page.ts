import { Component, OnInit, Input } from '@angular/core';
import { Video, Activitat } from 'models/models';
import { ModalController } from '@ionic/angular';
import { VideoManagerAPIClient } from 'services/VideoManagerAPIClient';

@Component({
  selector: 'app-validacio-activitat',
  templateUrl: './validacio-activitat.page.html',
  styleUrls: ['./validacio-activitat.page.scss'],
})
export class ValidacioActivitatPage implements OnInit {

  @Input('video') video: Video;
  @Input('activitat') activitat: Activitat;
  
  constructor(
    private modalCtrl: ModalController,
    private videoMgr: VideoManagerAPIClient

  ) {}

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  avalua(seleccio: number) {
    this.video.avaluacio = seleccio;
  }

  guarda() {

    if (!this.video.avaluacio) {
      // TODO: show toast
    } else {
      
      this.video.validat = true;
      this.videoMgr.modificaVideo(this.video)
        .subscribe(
          res => {
            this.video = res;
            this.modalCtrl.dismiss({
              video: this.video
            });
          }
        );
        
    }

  }

}
