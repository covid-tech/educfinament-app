import { Component, OnInit, Input } from '@angular/core';
import { User } from 'models/models';

@Component({
  selector: 'app-activity-btn',
  templateUrl: './activity-btn.component.html',
  styleUrls: ['./activity-btn.component.scss'],
})
export class ActivityBtnComponent implements OnInit {

  @Input('user') usuari: User;
  @Input('small') small: boolean = false;

  constructor() { }

  ngOnInit() {}

  getStands() {

    let parts = this.usuari.nom.split(" ");

    switch(parts.length) {
      case 0:
        return " ";
      case 1:
        return parts[0].substr(0, 2).toUpperCase();
      case 2:
        return parts[0].substr(0, 1).toUpperCase() + parts[1].substr(0,1).toUpperCase();
    }

  }

}
