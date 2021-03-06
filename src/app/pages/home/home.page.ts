import { Component } from '@angular/core';
import { Organitzacio, User, Grup } from 'models/models';
import { AuthService } from 'services/auth/auth.service';
import { UserManagerAPIClient } from 'services/UserManagerAPIClient';
import { Router, NavigationExtras } from '@angular/router';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
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
  novaInvitacioVisible: boolean = false;

  constructor(
    private auth: AuthService,
    private userMgr: UserManagerAPIClient,
    private router: Router,
    private alertController: AlertController,
    private grupMgr: GrupManagerAPIClient,
    private color: ColorService,
    private activitatMgr: ActivitatManagerAPIClient,
    private actionSheetCtrl: ActionSheetController,
    private toast: ToastController
  ) { }

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

  async showUserMenu() {
    let _user: User = this.auth.getUser();

    const actionSheet = await this.actionSheetCtrl.create({

      header: _user.nom || "Opcions",
      buttons: [
      {
        text: 'Tancar la sessió',
        icon: 'exit-outline',
        handler: () => {
          this.doLogout();
        }
      },
      {
        text: 'Cancel·la',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
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
            // console.log('Confirm Cancel');
          }
        }, {
          text: 'Crea',
          handler: (data) => {

            if (data.nomgrup) {
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

  async doRefresh(ev: any) {
    ev.target.complete();
    await this.carregaInfoUsuari();
  }

  async demanaInvitacio() {
    const alert = await this.alertController.create({
      header: `Uneix-te a activitat`,
      subHeader: `Enganxa aquí el codi que t'ha passat el teu centre o professor per afegir la nova activitat`,
      inputs: [
        {
          name: 'codiinvitacio',
          type: 'text',
          placeholder: `Codi d'invitació`
        }
      ],
      buttons: [
        {
          text: 'Cancel·la',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('Confirm Cancel');
          }
        }, {
          text: 'Entrar',
          handler: (data) => {

            console.log("DATA", data);

            if (data.codiinvitacio && data.codiinvitacio.length > 0) {
              this.activitatMgr.acceptaActivitatAmbCodi(this.user, data.codiinvitacio)
                .subscribe(
                  res => {
                    this.carregaInfoUsuari();
                  },
                  err => {
                    this.presentToast(`Aquest codi no pertany a cap activitat`);
                  }
                );

            } else {
              this.presentToast(`Has d'introduir un codi vàlid`);
            }

            console.log('Confirm Ok');

          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(text: string) {
    const toast = await this.toast.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }

}
