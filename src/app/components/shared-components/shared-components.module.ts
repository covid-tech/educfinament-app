import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { VideoItemComponent } from '../video-item/video-item.component';
import { ActivityBtnComponent } from '../activity-btn/activity-btn.component';
import { ActivityItemComponent } from '../activity-item/activity-item.component';



@NgModule({
  declarations: [
    VideoItemComponent,
    ActivityBtnComponent,
    ActivityItemComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    VideoItemComponent,
    ActivityBtnComponent,
    ActivityItemComponent
  ]
})
export class SharedComponentsModule { }
