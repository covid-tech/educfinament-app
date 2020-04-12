import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidacioActivitatPage } from './validacio-activitat.page';

const routes: Routes = [
  {
    path: '',
    component: ValidacioActivitatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidacioActivitatPageRoutingModule {}
