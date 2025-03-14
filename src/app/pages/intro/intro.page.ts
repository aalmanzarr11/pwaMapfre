import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AlertService } from 'src/app/services/infrastructure/alert/alert.service';
import { ConfigService } from 'src/app/services/infrastructure/config/config.service';
import { ConnectionService, ConnectionStatus } from 'src/app/services/infrastructure/connection/connection.service';
import { ConstantsService } from 'src/app/services/infrastructure/constants/constants.service';
import { ContextService } from 'src/app/services/infrastructure/context/context.service';
import { EnvironmentService } from 'src/app/services/infrastructure/environment/environment.service';
import { LoadingService } from 'src/app/services/infrastructure/loading/loading.service';
import { LocationService } from 'src/app/services/infrastructure/location/location.service';
import { StringsService } from 'src/app/services/remote/strings/strings.service';
import { SelectCountryPage } from '../select-country/select-country.page';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  OSName = 'Unknown OS';
  isMobile = false;

  constructor(
    public navCtrl: NavController,
    // public navParams: NavParams,
    // public geolocation: Geolocation,
    public platform: Platform,
    private alertServiceProvider: AlertService,
    private loadingServiceProvider: LoadingService,
    private stringsServiceProvider: StringsService,
    // public nativeGeocoder: NativeGeocoder,
    private connectionService: ConnectionService,
    private locationService: LocationService,
    private router: Router
  ) { }

  ngOnInit() {
    ContextService.currentPage = this;
    // this.stringsServiceProvider.getConfig();

    this.platform.backButton.subscribeWithPriority(10, () => {
      alert('back');
    });


    // DEBUG
    if (!EnvironmentService.isProduction) {

      setTimeout(function () {
        this.getReverseGeocode();
      }.bind(this), 1000);

      // this.loadingServiceProvider.hideLoading();
      // this.navCtrl.push(LoginPage); 
      // return this.router.navigateByUrl('/enter-car');
      return this.router.navigateByUrl('/login');
      // return this.router.navigateByUrl('/customer-data');
    }

    this.DetectOS();

    let params = window.location.search;
    if (params.startsWith('?')) {
      params = params.substring(1);
    }

    //console.log('params', params.toString());
    let inspectionParam = decodeURIComponent(params.toString());
    //console.log('inspectionParam', inspectionParam.toString());

    let urlParams = new URLSearchParams(inspectionParam);
    let numcot = urlParams.get("numcot");
    ContextService.numeroCotizacionFromURL = null;

    if (numcot && numcot.length > 0) {
      ContextService.numeroCotizacionFromURL = numcot;
    }

    // //console.log('decryptInspection params', );

  }

  DetectOS() {

    //console.log(navigator.userAgent);
    //console.log(navigator.platform);
    if (/Mobile|Android|iPhone/i.test(navigator.userAgent)) {
      if (navigator.platform.indexOf('Android') != -1) { this.OSName = 'Android', this.isMobile = true; }
      if (navigator.platform.indexOf('Linux') != -1) { this.OSName = 'Android', this.isMobile = true; }
      if (navigator.platform.indexOf('null') != -1) { this.OSName = 'Android', this.isMobile = true; }
      if (navigator.platform.indexOf('iPhone') != -1) { this.OSName = 'iOS', this.isMobile = true; }

      //console.log(this.isMobile);
      //console.log('Your OS: ' + this.OSName);
    }
  }

  public getCurrentPosition() {
    // this.loadingServiceProvider.showLoading();
    // navigator.geolocation.getCurrentPosition(
    //   function(position) {

    //     ContextService.location = {
    //       'country' : '',
    //       'lat' : position.coords.latitude,
    //       'long' : position.coords.longitude
    //     };
    //     // alert(JSON.stringify(ContextServiceProvider.location));
    //     // //console.log(ContextServiceProvider.location);
    //   },

    //   function (error) {
    //     // alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    //   }
    // );

    // this.loadingServiceProvider.hideLoading();
    // // this.getGlobalStrings(this.countryCode)
  }

  public getNetworkStatus() {

    this.connectionService.getNetworkStatus().subscribe(status => {


      //console.log('getNetworkStatus', status);

      if (status === ConnectionStatus.Offline) {

        this.alertServiceProvider.show('Error', 'No hay conexión a internet')
        // observer.next({ status: false, data: "No hay conexión a internet" });
        // observer.complete();
      } else {

      }

    });

  }

  onDeviceReady() {
    // this.getCurrentPosition();
  }

  // OBTENIENDO LOCALIZACION
  getLocation() {
    this.loadingServiceProvider.showLoading();

    // navigator.geolocation.getCurrentPosition(
    //   function(position) {

    //     // alert(position);

    //     //console.log('position', position);
    //     // alert(JSON.stringify(position));

    //     ContextService.location = {
    //       country: '',
    //       lat: position.coords.latitude,
    //       long: position.coords.longitude
    //     };
    //     this.loadingServiceProvider.hideLoading();


    //     // // Panamá
    //     // ContextServiceProvider.location.lat = 9.044044;
    //     // ContextServiceProvider.location.long = -79.450548;

    //     // // Guatemala
    //     // ContextServiceProvider.location.lat = 15.141610;
    //     // ContextServiceProvider.location.long = -90.641946;

    //     // http://api.geonames.org/findNearbyJSON?lat=15.141610&lng=-90.641946&username=gtrujillos

    //     if (ContextService.location.lat !== 0 && ContextService.location.long !== 0) {
    //       this.getReverseGeocode();
    //     } else {
    //       // this.navCtrl.push(SelectCountryPage);
    //       return this.router.navigateByUrl('/select-country');
    //     }

    //     // alert(JSON.stringify(ContextServiceProvider.location));
    //     // ContextServiceProvider.currentPage.navCtrl.push(SelectCountryPage);

    //   }.bind(this),
    //   function(error) {
    //     // alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');

    //     this.loadingServiceProvider.hideLoading();
    //     // alert(JSON.stringify(ContextServiceProvider.location));
    //     // this.navCtrl.push(SelectCountryPage);
    //     return this.router.navigateByUrl('/select-country');
    //   }.bind(this),
    //   { timeout: 10000 }
    // );
  }

  // EVENTO DE BOTON NEXT LLAMA A GETLOCATION
  next(event) {

    if (!this.isMobile && EnvironmentService.isProduction) {
      // this.alertServiceProvider.show('', 'Por integridad de la información lo invitamos a realizar su inspección desde un smartphone');
      // return; 
    }

    // this.getLocation();  
    this.getGlobalStrings();
    this.stringsServiceProvider.getConfig();
  }



  // CLASE LLAMADA POR GETREVERSEGEOCODE
  public getGlobalStrings() {
    if (ConfigService.strings !== null) {
      ContextService.hasSeenIntro = true;
      if (!EnvironmentService.isProduction) {

        return this.router.navigateByUrl('/login');
      }
      else {

        return this.router.navigateByUrl('/instructions');
      }




    }
    else {
      this.loadingServiceProvider.showLoading();
      this.stringsServiceProvider
        .getStringsStatic( )
        .subscribe(result => {
          //console.log('getGlobalStrings result', result);
          this.loadingServiceProvider.hideLoading();

          ContextService.hasSeenIntro = true;
          return this.router.navigateByUrl('/instructions');

        });
    }


  }

  // TEST DE CONSUMO DE STRINGSSERVICEPROVIDER
  public restTest() {
    this.loadingServiceProvider.showLoading();

    this.stringsServiceProvider.restTest().subscribe(result => {
      //console.log(JSON.stringify(result));

      alert(JSON.stringify(result));

      this.loadingServiceProvider.hideLoading();
    });
  }
}
