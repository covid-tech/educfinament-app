import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/app/activity';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss'],
})
export class ActivityItemComponent implements OnInit {

  @Input('activity') activity: Activity;
  @Input('max-users') maxUsers: number = 5;

  constructor() { }

  ngOnInit() {}

  extraUsersText() {
    return `+${this.activity.users.length - this.maxUsers}`;
  }
  
  firstUsers() {
    let qty = this.activity.users.length > this.maxUsers ? this.maxUsers : this.activity.users.length;
    return this.activity.users.slice(0, qty);
  }

}
