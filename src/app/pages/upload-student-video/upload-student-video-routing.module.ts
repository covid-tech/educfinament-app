import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadStudentVideoPage } from './upload-student-video.page';

const routes: Routes = [
  {
    path: '',
    component: UploadStudentVideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadStudentVideoPageRoutingModule {}
