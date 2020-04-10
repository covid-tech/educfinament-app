import { Component, OnInit, Input } from '@angular/core';
import { VideoItem, Video } from 'models/models';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
})
export class VideoItemComponent implements OnInit {

  @Input('video') video: Video;
  constructor() { }

  ngOnInit() {}

  getBackgroundColor() {
    return 'secondary';
  }

  getItemColor() {
    return 'secondary';
  }

}
