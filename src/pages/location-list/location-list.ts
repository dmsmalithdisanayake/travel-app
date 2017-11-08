import { Component } from '@angular/core';
import { LoadingController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthedHttp } from '../../providers/auth/authedHttp';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { LocationDetailPage } from '../location-detail/location-detail';

@Component({
  selector: 'page-location-list',
  templateUrl: 'location-list.html'
})
export class LocationListPage {

  locations: any = [];
  baseUrl = environment.apiUrl;

  constructor(    
    public navCtrl: NavController,
    public loadingController: LoadingController,
    private ahttp: AuthedHttp,
    public navParams: NavParams) {


       console.log("came");
this.getLocations();
    
  }

  getLocations(){
let loader = this.loadingController.create({
      content: 'Getting data...'
    });
    loader.present().then(() => {
      var subscription = Observable.fromPromise(this.ahttp.get(this.baseUrl + '/location'));
      subscription.subscribe((data: Observable<Response>) => {
        data.subscribe((rsp: Response) => {
           console.log("locations", rsp.json())
          loader.dismiss();
          this.locations = rsp.json();
             console.log("locations",this.locations)
          // this.searchVehicles = this.vehicles;
        })
      }, (err) => {
        console.log(err)
      });
    });
  }

  openLocation($event,location){
     console.log("locations",location);
    this.navCtrl.push(LocationDetailPage,location);
  }

}
