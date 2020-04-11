import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrganitzacioManagerAPIClient } from 'services/OrganitzacioManagerAPIClient';
import { Organitzacio, User, Grup } from 'models/models';
import { AuthService } from 'services/auth/auth.service';
import { UserManagerAPIClient } from 'services/UserManagerAPIClient';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user: User;
  organizations: Organitzacio[];
  selectedOrg: Organitzacio;

  constructor(
    private auth: AuthService,
    private userMgr: UserManagerAPIClient,
    private router: Router
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

  addStudent(ev: any) {
    console.log("Add student");
    ev.stopPropagation();
  }

  openActivity() {
    console.log("Open activity");
  }

  afegeixActivitat(grup: Grup) {
    console.log('Encara no va aixo');
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
        grup: grup
      }
    };
    this.router.navigate(['new-activity'], extras);

  }

}
