import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
//import { VideoItem } from 'models/models';
//import { User } from 'src/app/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public signUpForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public loadingController: LoadingController) {
    this.signUpForm = this.createSignUpForm();
  }

  ngOnInit() {
  }

  public doRegister() {
    // TODO: Call register API endpoint
    this.showLoaderIndicator();
  }

  private createSignUpForm() {
    return new FormGroup({
      fullname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.required)
    });
  }

  async showLoaderIndicator() {
    // TODO: Dismiss only when finishes API call
    const loading = await this.loadingController.create({
      message: 'Carregant...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

}
