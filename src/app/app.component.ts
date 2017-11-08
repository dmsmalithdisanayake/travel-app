import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Auth } from '../providers/auth/auth';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LocationListPage } from '../pages/location-list/location-list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public auth: Auth, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    // this.pages = [
    //   { title: 'Home', component: HomePage }
    // ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.auth.isLogged().then((data) => {
        if (data === true) {
          this.rootPage = HomePage;
        } else {
          this.auth.logout();
          this.rootPage = LoginPage;
        }
      })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goHome() {
    this.nav.push(HomePage);
  }

  goTrending() {
    this.nav.push(LocationListPage);
  }

  logout() {
    if (this.auth.logout() == true) {
      this.nav.setRoot(LoginPage);
    }
  }

}
