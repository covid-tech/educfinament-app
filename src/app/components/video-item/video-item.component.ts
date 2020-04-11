import { Component, OnInit, Input } from '@angular/core';
import { Video } from 'models/models';
import { ColorService } from 'src/app/color.service';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
})
export class VideoItemComponent implements OnInit {

  @Input('video') video: Video;
  @Input('color') color: string;
 
  constructor(
    private colorSVC: ColorService
  ) { }

  ngOnInit() {}

  getColor(color: string, transparent: boolean = false) {
    return this.colorSVC.getColor(color, transparent);
  }

}
