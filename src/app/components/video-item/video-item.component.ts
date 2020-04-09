import { Component, OnInit, Input } from '@angular/core';
import { VideoItem } from 'models/models';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
})
export class VideoItemComponent implements OnInit {

  @Input('video-item') videoItem: VideoItem;
  constructor() { }

  ngOnInit() {}

  getBackgroundColor() {
    if (!this.videoItem.isAnswer) {
      return 'secondary';
    }
    return this.videoItem.validated ? 'success' : 'danger';
  }

  getItemColor() {
    if (!this.videoItem.isAnswer) {
      return 'secondary';
    }

    return this.videoItem.validated ? 'success' : 'danger';
  }

}
