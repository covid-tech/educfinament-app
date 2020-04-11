import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadAvatarPageRoutingModule } from './upload-avatar-routing.module';

import { UploadAvatarPage } from './upload-avatar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadAvatarPageRoutingModule
  ],
  declarations: [UploadAvatarPage]
})
export class UploadAvatarPageModule {}
