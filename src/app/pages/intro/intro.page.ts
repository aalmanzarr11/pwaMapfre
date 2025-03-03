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
  ) {}

  ngOnInit() {
    ContextService.currentPage = this;
    // this.stringsServiceProvider.getConfig();

    this.platform.backButton.subscribeWithPriority(10, () => {
      alert('back');
    });
    

    // DEBUG
    if (!EnvironmentService.isProduction) {

      setTimeout(function(){
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
    if(params.startsWith('?')){
      params = params.substring(1);
    }

    console.log('params', params.toString());
    let inspectionParam = decodeURIComponent(params.toString());
    console.log('inspectionParam', inspectionParam.toString());

    let urlParams = new URLSearchParams(inspectionParam);
    let numcot = urlParams.get("numcot");
    ContextService.numeroCotizacionFromURL = null;

    if(numcot && numcot.length > 0) {
      ContextService.numeroCotizacionFromURL = numcot;
    }

    // console.log('decryptInspection params', );

  }

  DetectOS() {

    console.log(navigator.userAgent);
    console.log(navigator.platform);
    if ( /Mobile|Android|iPhone/i.test(navigator.userAgent) ) {
       if (navigator.platform.indexOf('Android') != -1) { this.OSName = 'Android', this.isMobile = true; }
       if (navigator.platform.indexOf('Linux') != -1) { this.OSName = 'Android', this.isMobile = true; }
       if (navigator.platform.indexOf('null') != -1) { this.OSName = 'Android', this.isMobile = true; }
       if (navigator.platform.indexOf('iPhone') != -1) { this.OSName = 'iOS', this.isMobile = true; }

      console.log(this.isMobile);
      console.log('Your OS: ' + this.OSName);
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
    //     // console.log(ContextServiceProvider.location);
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


      console.log('getNetworkStatus', status);

      if (status === ConnectionStatus.Offline) {

        this.alertServiceProvider.show('Error', 'No hay conexión a internet' )
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

    //     console.log('position', position);
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
    this.getReverseGeocode();
  }

  // EVENTO LLAMADO POR GETLOCATION
 public getReverseGeocode() {

    console.log('getReverseGeocode');

    this.loadingServiceProvider.showLoading();
    // this.loadingServiceProvider.hideLoading();

    this.locationService.reverseGeocode(ContextService.location.lat, ContextService.location.long).subscribe(result => {

        this.loadingServiceProvider.hideLoading();
        let countryCode = null;
        
        if (result.data != null) {

          let resultArray = result.data.split('\n');

          resultArray.forEach(element => {
            if(element.startsWith('loc=')) {
              // console.log('element: ', element);
              countryCode = element.replace('loc=', '');
            }
          });

          // DEBUG 
          if (!EnvironmentService.isProduction) {
            countryCode = ConstantsService.HONDURAS_CODE_ISO; // ISO
          }


          switch(countryCode) { 
            case ConstantsService.PANAMA_CODE_ISO: { 
              countryCode = ConstantsService.PANAMA_CODE;
              break; 
            } 
            case ConstantsService.GUATEMALA_CODE_ISO: { 
              countryCode = ConstantsService.GUATEMALA_CODE;
              break; 
            } 
            case ConstantsService.COSTARICA_CODE_ISO: { 
              countryCode = ConstantsService.COSTARICA_CODE;
              break; 
            } 
            case ConstantsService.NICARAGUA_CODE_ISO: { 
              countryCode = ConstantsService.NICARAGUA_CODE;
              break; 
            } 
            case ConstantsService.HONDURAS_CODE_ISO: { 
              countryCode = ConstantsService.HONDURAS_CODE;
              break; 
            } 
            case ConstantsService.ELSALVADOR_CODE_ISO: { 
              countryCode = ConstantsService.ELSALVADOR_CODE;
              break; 
            } 
            default: { 
              countryCode = null;
              break; 
            } 
          } 

          ContextService.location.country = countryCode;
          // console.log('countryCode: ' + ContextServiceProvider.location.country);
          this.getGlobalStrings();
          this.stringsServiceProvider.getConfig(ContextService.location.country);
        } 
        else {
          // this.navCtrl.push(SelectCountryPage);
          ContextService.hasSeenIntro = true;
          return this.router.navigateByUrl('/select-country');
        }

      }
      , error => {
        this.loadingServiceProvider.hideLoading();
        // this.alertServiceProvider.show('Error', error);
        // this.navCtrl.push(SelectCountryPage);
        ContextService.hasSeenIntro = true;
        return this.router.navigateByUrl('/select-country');
      }

    );

    // this.nativeGeocoder
    //   .reverseGeocode(
    //     ContextServiceProvider.location.lat,
    //     ContextServiceProvider.location.long,
    //     options
    //   )
    //   .then((result: NativeGeocoderReverseResult[]) => {
    //     // alert(JSON.stringify(result));
    //     if (result.length > 0) {
    //       ContextServiceProvider.location.country = result[0].countryCode;
    //       // this.countryCode = ContextServiceProvider.location.country;
    //       // this.getGlobalStrings();
    //     }
    //     // else {
    //     //   // ContextServiceProvider.currentPage.showForm = true;
    //     // }
    //     this.loadingServiceProvider.hideLoading();
    //     // this.navCtrl.push(SelectCountryPage);
    //   })
    //   .catch((error: any) => {
    //     console.log(error);
    //     // ContextServiceProvider.currentPage.loadingServiceProvider.hideLoading();
    //     // this.navCtrl.push(SelectCountryPage);
    //   });

      // }
    // });
 }

  // CLASE LLAMADA POR GETREVERSEGEOCODE
  public getGlobalStrings() {

    console.log('getGlobalStrings ContextServiceProvider.location.country', ContextService.location.country);

    this.loadingServiceProvider.showLoading();

    this.stringsServiceProvider 
      .getStringsStatic(ContextService.location.country)
      .subscribe(result => {

        // console.log('getGlobalStrings result', result);
        this.loadingServiceProvider.hideLoading();

        ContextService.hasSeenIntro = true;
        if (ConfigService.strings !== null) {

          // ContextServiceProvider.location.country = countryCode;
          // ConfigServiceProvider.strings = result.data;
          // ConfigServiceProvider.apiUrl = ConfigServiceProvider.strings.servicesURL;
          // DEBUG 
          if (!EnvironmentService.isProduction) {
            // this.loadingServiceProvider.hideLoading();
            // this.navCtrl.push(LoginPage);

            // return this.router.navigateByUrl('/instructions');
            // return this.router.navigateByUrl('/login');
            // return this.router.navigateByUrl('/enter-car');
            // return this.router.navigateByUrl('/customer-data');
            // return this.router.navigateByUrl('/car-legal-pictures');
            // return this.router.navigateByUrl('/car-take-legal-pictures');
            // return this.router.navigateByUrl('/car-more-legal-pictures');
            // return this.router.navigateByUrl('/car-pictures');
            // return this.router.navigateByUrl('/take-picture');
            // return this.router.navigateByUrl('/car-damage');
            // return this.router.navigateByUrl('/car-accessories');
            // return this.router.navigateByUrl('/car-accessory');
            // return this.router.navigateByUrl('/accept-inspection');
            // return this.router.navigateByUrl('/car-inspection-success');

            // ContextService.hasSeenIntro = true;
            return this.router.navigateByUrl('/login');
            // return this.router.navigateByUrl('/customer-data');
          }
          else{
            // this.navCtrl.push(InstructionsPage);
            // ContextService.hasSeenIntro = true;
            return this.router.navigateByUrl('/instructions');
            // return this.router.navigateByUrl('/login');
          }



        } else {
          // this.alertServiceProvider.show('Error', result.data);
          // this.loadingServiceProvider.hideLoading();
          // this.navCtrl.push(SelectCountryPage);
          ContextService.hasSeenIntro = true;
          return this.router.navigateByUrl('/select-country');
        }


        // console.log(ContextServiceProvider.location);
        // this.loadingServiceProvider.hideLoading();
      });

  }

  // TEST DE CONSUMO DE STRINGSSERVICEPROVIDER
  public restTest() {
    this.loadingServiceProvider.showLoading();

    this.stringsServiceProvider.restTest().subscribe(result => {
      console.log(JSON.stringify(result));

      alert(JSON.stringify(result));

      this.loadingServiceProvider.hideLoading();
    });
  }
}
