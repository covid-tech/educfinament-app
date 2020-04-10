import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/user';
import { OrganitzacioManagerAPIClient } from 'services/OrganitzacioManagerAPIClient';
import { Organitzacio } from 'models/models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  schools: any[];
  selectedSchool: any;
  automaticClose = true;

  public user: User = {
    nom: "Pepet",
    cognoms: "Canals",
    profileImg: "https://randomuser.me/api/portraits/med/women/94.jpg",
    sent: true,
    validated: false
  };

  constructor(
    private http: HttpClient,
    private orgMgrAPIClient: OrganitzacioManagerAPIClient
  ) {
    this.http.get('assets/activitats.json').subscribe(res => {
      this.schools = res["schools"];
      this.selectedSchool = this.schools[0];
    });
  }

  ionViewWillEnter() {
    this.orgMgrAPIClient.getOrganitzacio(1)
      .subscribe(
        (organitzacio: Organitzacio) => {
          console.log("Org: " + organitzacio);
        }
      );
  }

  toggleSchool(schoolIndex: number) {
    this.schools[schoolIndex].open = !this.schools[schoolIndex].open;

    if (this.automaticClose && this.schools[schoolIndex].open) {
      this.schools
        .filter((item, itemIndex) => itemIndex != schoolIndex)
        .map(item => this.closeSchool(item));
    }

  }

  closeSchool(item) {
    item.open = false;
    item.classrooms.forEach(x => {
      x.open = false;
    });
  }

  toggleClassroom(schoolIndex: number, classroomIndex: number) {
    this.schools[schoolIndex].classrooms[classroomIndex].open = !this.schools[schoolIndex].classrooms[classroomIndex].open;

    if (this.automaticClose && this.schools[schoolIndex].classrooms[classroomIndex].open) {
      
      this.schools[schoolIndex].classrooms
        .filter((item, itemIndex) => itemIndex != classroomIndex)
        .map(item => item.open = false);
    }

  }

  addStudent(ev: any) {
    console.log("Add student");
    ev.stopPropagation();
  }

  openActivity() {
    console.log("Open activity");
  }


}
