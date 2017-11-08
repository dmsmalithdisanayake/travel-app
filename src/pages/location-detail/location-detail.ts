import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';
// import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-location-detail',
  templateUrl: 'location-detail.html',
})
export class LocationDetailPage {

location:any = [];
// location_coord:{ lat:number, lng:number };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    // public geoloc: Geolocation
  ) {

    this.location = this.navParams.data;
    console.log("location",this.location);

  }

  ionViewDidLoad() {}

locationClick($event,location){
  this.navCtrl.push(MapPage,location);
//   this.geoloc.getCurrentPosition().then((resp) => {
// this.location_coord = {
//   lat:resp.coords.latitude,
//   lng:resp.coords.longitude 
// };
// this.navCtrl.push(MapPage,this.location_coord);
// }).catch((error) => {
//   console.log('Error getting location', error);
// });
  
}
}

