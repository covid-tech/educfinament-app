import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadActivityVideoPage } from './upload-activity-video.page';

const routes: Routes = [
  {
    path: '',
    component: UploadActivityVideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadActivityVideoPageRoutingModule {}
