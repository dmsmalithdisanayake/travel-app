import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Auth } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { LocationListPage } from '../location-list/location-list';
// import { CreateUserPage } from '../create-user/create-user';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,    
    public loadingController: LoadingController,
    private auth: Auth,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder) {

    this.loginForm = formBuilder.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    })

  }

  ionViewDidLoad() { }

  onSubmit(loginData) {
    console.log(loginData.value);
    if (loginData.valid) {
      let loader = this.loadingController.create({
        content: 'Logging...'
      });
      loader.present().then(() => {
        this.auth.login(loginData.value).subscribe((response) => {
            console.log("data",response);
          if (response) {
          
            loader.dismiss();
            this.navCtrl.setRoot(LocationListPage);
          }
        },
          err => {
             
            loader.dismiss();
            loginData.password = "";
            let alert = this.alertCtrl.create({
              title: "Login Failed",
              buttons: ['Try again']
            })
            alert.present();
          })
      });
    }
  }
  
// createuserclick(){
// this.navCtrl.push(CreateUserPage);
// }
}
