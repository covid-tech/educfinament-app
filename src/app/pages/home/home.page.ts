import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrganitzacioManagerAPIClient } from 'services/OrganitzacioManagerAPIClient';
import { Organitzacio, User, Grup } from 'models/models';
import { AuthService } from 'services/auth/auth.service';
import { UserManagerAPIClient } from 'services/UserManagerAPIClient';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { GrupManagerAPIClient } from 'services/GrupManagerAPIClient';
import { ColorService } from 'src/app/color.service';
import { ActivitatManagerAPIClient } from 'services/ActivitatManagerAPIClient';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user: User;
  organizations: Organitzacio[];
  selectedOrg: Organitzacio;
  codiInvitacio: string;

  constructor(
    private auth: AuthService,
    private userMgr: UserManagerAPIClient,
    private router: Router,
    private alertController: AlertController,
    private grupMgr: GrupManagerAPIClient,
    private color: ColorService,
    private activitatMgr: ActivitatManagerAPIClient
  ) {}

  ionViewWillEnter() {
    this.carregaInfoUsuari();
  }

  async carregaInfoUsuari() {
    this.user = this.auth.getUser();
    this.userMgr.getInfoUsuari(this.user.id)
      .subscribe(
        res => {
          this.auth.setUser(res);
          this.organizations = res.organitzacions;
          this.selectedOrg = this.organizations[0];
        }
      );
  }

  doLogout() {
    this.userMgr.logout();
    this.router.navigate(['signin']);
  }

  userImg() {
    return this.user ? this.auth.getUserProfileImg() : null;
  }

  creaActivitat(grup: Grup) {

    let extras: NavigationExtras = {
      state: {
        grup: grup,
        professor: this.user
      }
    };
    this.router.navigate(['new-activity'], extras);

  }

  async creaGrup() {
    const alert = await this.alertController.create({
      header: 'Nou grup',
      inputs: [
        {
          name: 'nomgrup',
          type: 'text',
          placeholder: 'Nom del grup'
        }
      ],
      buttons: [
        {
          text: 'Cancel·la',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Crea',
          handler: (data) => {

            if(data.nomgrup) {
              let grup: Grup = {
                id: null,
                activitats: [],
                participants: [],
                nom: data.nomgrup,
                organitzacio: this.selectedOrg,
                professors: [this.user]
              }

              this.grupMgr.creaGrup(grup)
                .subscribe(
                  res => {
                    console.log("Grup creat: ", res);
                    this.carregaInfoUsuari();
                  },
                  err => { console.log("ERR: ", err); }
                );

            }

            console.log('Confirm Ok');

          }
        }
      ]
    });

    await alert.present();
  }

  getColor(color: string, transparent: boolean = false) {
    return this.color.getColor(color, transparent);
  }

  acceptaInvitacio() {
    this.activitatMgr.acceptaActivitatAmbCodi(this.user, this.codiInvitacio)
      .subscribe(
        res => {
          this.carregaInfoUsuari();
          this.codiInvitacio = "";
        },
        err => { console.log("Error: ", err); }
      );
  }

}
