import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { VideoItemComponent } from '../video-item/video-item.component';
import { ActivityBtnComponent } from '../activity-btn/activity-btn.component';



@NgModule({
  declarations: [
    VideoItemComponent,
    ActivityBtnComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    VideoItemComponent,
    ActivityBtnComponent
  ]
})
export class SharedComponentsModule { }
