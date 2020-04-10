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
    return this.usuari.nom[0].toUpperCase() + this.usuari.cognoms[0].toUpperCase();
  }

}
