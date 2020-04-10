import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { SigninPage } from 'pages/signin/signin.page';
import { Router } from '@angular/router';
//import { VideoItem } from 'models/models';
//import { User } from 'src/app/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public signUpForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder, 
    private alertController: AlertController, 
    private router: Router, 
    private loadingController: LoadingController
  ) {
    this.signUpForm = this.createSignUpForm();
  }

  ngOnInit() {
  }

  public checkAndDoRegister() {
    if(Math.floor((Date.now() - Date.parse(this.signUpForm.value.birthdate)) / 31536000000) < 18) {
      this.presentAlert("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", () => {
        this.doRegister();
      });
    } else {
      this.doRegister();
    }
  }

  private doRegister() {
    // TODO: Call register API endpoint
    this.showLoaderIndicator();
  }

  public goToLogin() {
    this.router.navigate(['signin']);
  }

  private createSignUpForm() {
    return new FormGroup({
      fullname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.required),
      birthdate: new FormControl('', Validators.required)
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

  async presentAlert(msg: string, callback: any) {
    const alert = await this.alertController.create({
      header: 'Avís',
      message: msg,
      buttons: [{
          text: 'Ok',
          handler: () => {
            callback();
          }}]
    });

    await alert.present();
  }
}
