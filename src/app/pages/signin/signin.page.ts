import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
//import { VideoItem } from 'models/models';
//import { User } from 'src/app/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  public signInForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder, 
    public loadingController: LoadingController,
    private router: Router
  ) {
    this.signInForm = this.createSignInForm();
  }

  ngOnInit() {
  }

  public doLogin() {
    // TODO: Call login API endpoint
    this.showLoaderIndicator();
  }

  public goToSignup() {
    this.router.navigate(['signup']);
  }

  private createSignInForm() {
    return new FormGroup({
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
