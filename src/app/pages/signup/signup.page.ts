import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { SigninPage } from 'pages/signin/signin.page';
//import { VideoItem } from 'models/models';
//import { User } from 'src/app/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public signUpForm: FormGroup;

  constructor(public alertController: AlertController, public navCtrl: NavController, public formBuilder: FormBuilder, public loadingController: LoadingController) {
    this.signUpForm = this.createSignUpForm();
  }

  ngOnInit() {
  }

  public doRegister() {
    if(Math.floor((Date.now() - Date.parse(this.signUpForm.value.birthdate)) / 31536000000) < 18) {
      this.presentAlert("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
    } else {
      // TODO: Call register API endpoint
      this.showLoaderIndicator();
    }
  }

  public goToLogin() {
    this.navCtrl.navigateForward("signin");
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

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Avís',
      message: msg,
      buttons: ["Ok"]
    });

    await alert.present();
  }
}
