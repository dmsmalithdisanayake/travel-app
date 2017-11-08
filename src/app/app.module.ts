import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MapPage } from '../pages/map/map';
import { LocationListPage } from '../pages/location-list/location-list';
import { LoginPage } from '../pages/login/login';
import { LocationDetailPage } from '../pages/location-detail/location-detail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConnectivityProvider } from '../providers/connectivity/connectivity';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { LocationsProvider } from '../providers/locations/locations';

import { HttpModule } from '@angular/http';

import { AuthedHttp } from '../providers/auth/authedHttp';
import { Auth } from '../providers/auth/auth';

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MapPage,
    LocationListPage,
    LoginPage,
    LocationDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__mercury',
      driverOrder: ['indexeddb', 'websql']
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MapPage,
    LocationListPage,
    LoginPage,
    LocationDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthedHttp,
    Auth,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConnectivityProvider,
    GoogleMapsProvider,
    LocationsProvider
  ]
})
export class AppModule { }
