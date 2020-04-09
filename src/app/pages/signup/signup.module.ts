import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from 'pages/signup/signup-routing.module';
import { SignupPage } from 'pages/signup/signup.page';
import { SharedComponentsModule } from 'components/shared-components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SignupPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [SignupPage]
})
export class SignupPageModule {}
