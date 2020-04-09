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
  @Input('color') color: string = 'purple';

  constructor() { }

  ngOnInit() {}

  extraUsersText() {
    return `+${this.activity.users.length - this.maxUsers}`;
  }
  
  firstUsers() {
    let qty = this.activity.users.length > this.maxUsers ? this.maxUsers : this.activity.users.length;
    return this.activity.users.slice(0, qty);
  }

  getColor(color:string, transparent:boolean = false) {
    switch(color) {
      case 'yellow':
        return transparent ? 'rgba(243, 196, 79, 0.5)' : '#f3c34c';
      case 'blue':
        return transparent ? 'rgba(56, 175, 174, 0.5)' : '#38afae';
      case 'red':
        return transparent ? 'rgba(239, 74, 61, 0.5)' : '#ef4a3d';
      case 'purple':
        return transparent ? 'rgba(127, 133, 215, 0.5)' : '#7f85d7';
      case 'pink':
        return transparent ? 'rgba(239, 72, 145, 0.5)' : '#ef4891';
    }
  }

}
