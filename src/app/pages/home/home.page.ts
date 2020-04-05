import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  schools: any[];
  automaticClose = true;

  constructor(
    private http: HttpClient
  ) {
    this.http.get('assets/activitats.json').subscribe(res => {
      this.schools = res["schools"];
    })
  }

  toggleSchool(schoolIndex: number) {
    this.schools[schoolIndex].open = !this.schools[schoolIndex].open;

    if (this.automaticClose && this.schools[schoolIndex].open) {
      this.schools
        .filter((item, itemIndex) => itemIndex != schoolIndex)
        .map(item => item.open = false);
    }

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
