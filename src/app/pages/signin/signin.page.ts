import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthenticateRequest, AuthenticateResponse } from 'models/models';
import { UserManagerAPIClient } from 'services/UserManagerAPIClient';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  public signInForm: FormGroup;
  private loadingIndicator: any;

  constructor(private userManagerAPIClient: UserManagerAPIClient, public alertController: AlertController, public formBuilder: FormBuilder, public loadingController: LoadingController) {
    this.signInForm = this.createSignInForm();
  }

  ngOnInit() {
  }

  public doLogin() {
    this.showLoaderIndicator();

    let signinRequest: AuthenticateRequest = {
      user: this.signInForm.value.email,
      pass: this.signInForm.value.password
    };

    this.userManagerAPIClient.signIn(signinRequest).subscribe(
      data => {
        this.hideLoaderIndicator();
        // TODO: Go to the main page
      },
      err => {
        this.hideLoaderIndicator();
        // TODO: Verify the http response code and show the proper message
        setTimeout(() => {
          this.presentAlert("Error", "Hi ha hagut un problema amb l'autentificació. Intenti-ho de nou.", () => {});
        }, 1000);
      },
      () => {
      }
    );
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
    this.loadingIndicator = await this.loadingController.create({
      message: 'Carregant...'
    });
    await this.loadingIndicator.present();
  }

  async hideLoaderIndicator() {
    setTimeout(() => { this.loadingIndicator.dismiss(); }, 500);
  }

  async presentAlert(header: string, msg: string, callback: any) {
    const alert = await this.alertController.create({
      header: header,
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
