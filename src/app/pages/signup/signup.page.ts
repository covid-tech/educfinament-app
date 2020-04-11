import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { SigninPage } from 'pages/signin/signin.page';
import { Router } from '@angular/router';
import { SignUpRequest, AuthenticateRequest } from 'models/models';
import { UserManagerAPIClient } from 'services/UserManagerAPIClient';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public signUpForm: FormGroup;
  private loadingIndicator: any;

  constructor(
    public formBuilder: FormBuilder, 
    private alertController: AlertController, 
    private router: Router, 
    private loadingController: LoadingController,
    private userManagerAPIClient: UserManagerAPIClient,
    public navCtrl: NavController,
  ) {
    this.signUpForm = this.createSignUpForm();
  }

  ngOnInit() {
  }

  public checkAndDoRegister() {
    if(Math.floor((Date.now() - Date.parse(this.signUpForm.value.birthdate)) / 31536000000) < 18) {
      this.presentAlert("Avís", "No ets major d'edat, és per això que t'aconsellem que utilitzis aquesta aplicació sota la supervisió d'un tutor.", () => {
        this.doRegister();
      });
    } else {
      this.doRegister();
    }
  }

  private doRegister() {
    this.showLoaderIndicator();

    let signupRequest: SignUpRequest = {
      username: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      email: this.signUpForm.value.email,
      nom: this.signUpForm.value.fullname,
      cognoms: ""
    };

    this.userManagerAPIClient.signUp(signupRequest).subscribe(
      data => {
        
        let signinRequest: AuthenticateRequest = {
          user: this.signUpForm.value.email,
          pass: this.signUpForm.value.password
        };       

        this.userManagerAPIClient.signIn(signinRequest).subscribe(
          data => {
            this.hideLoaderIndicator();
            this.router.navigate(['home']);
          },
          err => {
            this.hideLoaderIndicator();
            // TODO: Verify the http response code and show the proper message
            setTimeout(() => {
              this.presentAlert("Error", "Hi ha hagut un problema amb l'autentificació. Intenti-ho de nou.\n" + JSON.stringify(err), () => {});
            }, 1000);
          }
        );
      },
      err => {
        this.hideLoaderIndicator();
        setTimeout(() => {
          this.presentAlert("Error", "Hi ha hagut un problema amb el registre. Intenti-ho més tard. \n" + JSON.stringify(err), () => {});
        }, 1000);
      },
      () => {
      }
    );

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
