import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { VideoItemComponent } from '../video-item/video-item.component';



@NgModule({
  declarations: [
    VideoItemComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    VideoItemComponent
  ]
})
export class SharedComponentsModule { }
