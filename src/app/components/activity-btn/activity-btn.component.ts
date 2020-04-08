import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/user';

@Component({
  selector: 'app-activity-btn',
  templateUrl: './activity-btn.component.html',
  styleUrls: ['./activity-btn.component.scss'],
})
export class ActivityBtnComponent implements OnInit {

  @Input('user') user: User;
  @Input('small') small: boolean = false;

  constructor() { }

  ngOnInit() {}

  getStands() {
    return this.user.nom[0].toUpperCase() + this.user.cognoms[0].toUpperCase();
  }

}
