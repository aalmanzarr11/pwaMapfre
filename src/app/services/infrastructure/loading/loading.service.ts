import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HttpClientService } from '../http-client/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  
  public total: number = 0;
  public callback : any;
  public controller : any;
  public loading: Promise<void>;

  constructor(public http: HttpClientService, private loadingController: LoadingController) {
    // //console.log('Hello LoadingServiceProvider Provider');
  }

  showLoading() {

    if(this.loading == null){
      this.loading = this.loadingController.create({
        message: 'Cargando...',
        cssClass: 'loading-custom-class'
        // dismissOnPageChange: true
      })
      .then((response) => {
        response.present();
      });
      // this.loading.present();
    }

    this.total++;

    // //console.log("showLoading");
    // //console.log(this.total);
  }

  hideLoading() {
    
    this.total--;

    // //console.log("hideLoading");
    // //console.log(this.total);

    if(this.total <= 0 && this.loading != null){


      setTimeout(function(){

        this.loadingController.dismiss().then((response) => {

          if(this.callback){
            // //console.log('callback');
            this.callback(this.controller);
            this.callback = null;
          }

          this.loading = null;

        }).catch((err) => {
            //console.log('Error occured : ', err);
        });
  
      }.bind(this), 1000);


        
    }
  } 
}
