import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/infrastructure/alert/alert.service';
import { ConstantsService } from 'src/app/services/infrastructure/constants/constants.service';
import { ContextService } from 'src/app/services/infrastructure/context/context.service';
import { HelperStringsService } from 'src/app/services/infrastructure/helper-strings/helper-strings.service';
import { LoadingService } from 'src/app/services/infrastructure/loading/loading.service';
import { StringsService } from 'src/app/services/remote/strings/strings.service';

@Component({
  selector: 'app-select-country',
  templateUrl: './select-country.page.html',
  styleUrls: ['./select-country.page.scss'],
})
export class SelectCountryPage implements OnInit {

  public countryCode: string;
  // public showForm = false;

  constructor(
    private navCtrl: NavController,
    private alertServiceProvider: AlertService,
    private loadingServiceProvider: LoadingService,
    private stringsServiceProvider: StringsService,
    private helperStrings: HelperStringsService,
    private router: Router) {

    // let backAction =  platform.registerBackButtonAction(() => {
    //   console.log("second");
    //   // this.navCtrl.pop();
    //   // backAction();
    // }, 2);

  }

  ngOnInit() {
    ContextService.currentPage = this;
    // this.getCurrentLocation();

    // alert(JSON.stringify(ContextServiceProvider.location));
    // this.countryCode = ContextServiceProvider.location.country;

  }

  getCurrentLocation() {

    // alert(JSON.stringify(ContextServiceProvider.location));

    // if(ContextServiceProvider.location.lat != 0 && ContextServiceProvider.location.long != 0){

    //   let options: NativeGeocoderOptions = {
    //     useLocale: true,
    //     maxResults: 5
    //   };

    //   this.loadingServiceProvider.showLoading();

    //   this.nativeGeocoder.reverseGeocode(
    //     ContextServiceProvider.location.lat,
    //     ContextServiceProvider.location.long,
    //     options
    //   )
    //   .then((result: NativeGeocoderReverseResult[]) => {

    //     // alert(JSON.stringify(result));

    //     if (result.length > 0) {
    //       ContextServiceProvider.location.country = result[0].countryCode;
    //       this.countryCode = ContextServiceProvider.location.country;
    //       this.getGlobalStrings(this.countryCode);
    //     }
    //     else{
    //       ContextServiceProvider.currentPage.showForm = true;
    //     }

    //     ContextServiceProvider.currentPage.loadingServiceProvider.hideLoading();

    //     // this.navCtrl.push(SelectCountryPage);

    //   })
    //   .catch((error: any) => {
    //     // alert("Error: " + error);
    //   });

    // }




    // navigator.geolocation.getCurrentPosition(
    //   function (position) {

    //     ContextServiceProvider.location = {
    //       'lat': position.coords.latitude,
    //       'long': position.coords.longitude
    //     };

    //     if (ContextServiceProvider.location.lat != 0 || ContextServiceProvider.location.long != 0) {
    //       // this.loadingServiceProvider.showLoading();
    //       // console.log(this);
    //       // console.log(position);
    //     }

    //   },
    //   function (error) { }
    // );

  }

  next() {

    console.log(this.countryCode);

    if (!this.countryCode || this.countryCode.length == 0) {
      this.alertServiceProvider.show('', 'Debe seleccionar su país');
    } else {
      this.getGlobalStrings(this.countryCode);
      this.stringsServiceProvider.getConfig();
    }

  }

  private getGlobalStrings(countryCode: string) {

    this.loadingServiceProvider.showLoading();

    this.stringsServiceProvider.getStringsStatic(countryCode)
      .subscribe(result => {

        console.log('getGlobalStrings result:', result);
        this.loadingServiceProvider.hideLoading();

        // if (result.status && result.data != null) {
        //   ContextServiceProvider.location.country = countryCode;
        //   ConfigServiceProvider.strings = result.data;
        //   // console.log(ConfigServiceProvider.strings.carMaxAge);
        //   ConfigServiceProvider.apiUrl = ConfigServiceProvider.strings.servicesURL;
        //   // // this.helperStrings.carmaxage = parseInt(result.data.carMaxAge);
        //   // //console.log(this.helperStrings.carmaxage);
          // this.navCtrl.push(InstructionsPage);
          return this.router.navigateByUrl('/instructions');

      });
  }

  public getPanamaCode() {
    return ConstantsService.PANAMA_CODE;
  }

  public getGuatemalaCode() {
    return ConstantsService.GUATEMALA_CODE;
  }

  public getHondurasCode() {
    return ConstantsService.HONDURAS_CODE;
  }

  public getElSalvadorCode() {
    return ConstantsService.ELSALVADOR_CODE;
  }

  public getCostaRicaCode() {
    return ConstantsService.COSTARICA_CODE;
  }

  public getNicaraguaCode() {
    return ConstantsService.NICARAGUA_CODE;
  }
}
