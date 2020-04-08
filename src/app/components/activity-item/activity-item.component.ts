import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/app/activity';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss'],
})
export class ActivityItemComponent implements OnInit {

  @Input('activity') activity: Activity;

  constructor() { }

  ngOnInit() {}

}
