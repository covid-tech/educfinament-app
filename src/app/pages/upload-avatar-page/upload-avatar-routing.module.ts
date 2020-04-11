import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadAvatarPage } from './upload-avatar.page';

const routes: Routes = [
  {
    path: '',
    component: UploadAvatarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadAvatarPageRoutingModule {}
