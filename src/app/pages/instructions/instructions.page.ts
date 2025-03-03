import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from 'selenium-webdriver';
import { AlertService } from 'src/app/services/infrastructure/alert/alert.service';
import { ConfigService } from 'src/app/services/infrastructure/config/config.service';
import { ConstantsService } from 'src/app/services/infrastructure/constants/constants.service';
import { ContextService } from 'src/app/services/infrastructure/context/context.service';
import { HelperStringsService } from 'src/app/services/infrastructure/helper-strings/helper-strings.service';
import { InspectionService } from 'src/app/services/remote/inspection/inspection.service';
import { LoadingService } from 'src/app/services/infrastructure/loading/loading.service';
import { StringsService } from 'src/app/services/remote/strings/strings.service';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.page.html',
  styleUrls: ['./instructions.page.scss'],
})
export class InstructionsPage implements OnInit {

  isModal: any;
  strings: any = {};
  public countryCode: string = ConstantsService.PANAMA_CODE;

  constructor(
    // public navCtrl: NavController, 
    // public navParams: NavParams,
    private inspectionProvider: InspectionService,
    public loadingServiceProvider: LoadingService,
    public stringsServiceProvider: StringsService,
    public alertServiceProvider: AlertService,
    public contextServiceProvider: ContextService,
    private helperStrings: HelperStringsService,
    private router: Router) {
    // this.isModal = navParams.get('isModal') ? navParams.get('isModal') : false;
  }

  ngOnInit(){
    this.strings = ConfigService.strings;
  }

 /* public back(){
    this.navCtrl.pop();
  }*/

  public next(){

    console.log('ContextService.numeroCotizacionFromURL', ContextService.numeroCotizacionFromURL);
    console.log('ContextService.location.country', ContextService.location.country);
    console.log('ConstantsService.PANAMA_CODE', ConstantsService.PANAMA_CODE);

    if(ContextService.numeroCotizacionFromURL && ContextService.numeroCotizacionFromURL.length > 0 && ContextService.location.country === ConstantsService.PANAMA_CODE){
      ContextService.userSession.userType = 'C';
      this.loadInspections();
    }
    else{
      return this.router.navigateByUrl('/login');
    }

    // alert('jjj');
    // this.navCtrl.push(LoginPage);
    
    // this.getGlobalStrings(this.countryCode);
  }

  public loadInspections(){
    this.loadingServiceProvider.showLoading();

      this.inspectionProvider.loadInspections(null, null, ContextService.numeroCotizacionFromURL).subscribe(result => {

          this.loadingServiceProvider.hideLoading();

          
          // TODO: Validar si los datos no están en null


          if (result != null && result.data != null && result.data.length > 0) {
            // ContextService.footerMenuOptions[this.currentPage - 1]['status'] = 2;
            // this.navController.push(InspectionListPage, { inspections: result.data });
            // this.navController.push(CustomerDataPage);


            // if(result.data.length > 0){
            //   // // this.navController.push(
            //   // //   InspectionListPage,
            //   // //   // { inspections: [ContextService.currentInspection] }
            //   // //   { inspections: result.data }
            //   // // );
            //   // ContextService.footerMenuOptions[this.currentPage - 1]['status'] = 2;
            //   // ContextService.inspectionList = result.data;
            //   // return this.router.navigateByUrl('/inspection-list');
            // }
            // else{
            if(result.data[0].numeroCotizacion != null) {
              ContextService.currentInspection.numeroCotizacion = result.data[0].numeroCotizacion;
            }
            else if(result.data[0].poliza != null) {
              ContextService.currentInspection.numeroCotizacion = result.data[0].poliza;
            }
            else{
              this.alertServiceProvider.show('', 'No se encontró la cotización');
              return;
            }

            this.loadInspectionDetails();
            // }

          } else {

            // console.log('ContextService.location.country', ContextService.location.country);
            // console.log('ConstantsService.GUATEMALA_CODE', ConstantsService.GUATEMALA_CODE);

            // if(ContextService.location.country === ConstantsService.GUATEMALA_CODE) {
            //   this.getInspectionNumber();
            // }
            // else {
              this.alertServiceProvider.show('', 'No se encontró la cotización');
            // }

            


            // this.storageService.loadInspection(this.currentInspection, this, this.loadCallback);

            // // TODO: Load inspection number
            // ContextService.footerMenuOptions[this.currentPage - 1]['status'] = 2;
            // this.navController.push(CustomerDataPage);
          }
        },
          error => {
            this.loadingServiceProvider.hideLoading();
            this.alertServiceProvider.show('Error', error);
          }
        );
  }

  public loadInspectionDetails() {

    this.loadingServiceProvider.showLoading();

    this.inspectionProvider.loadInspectionDetails(
      ContextService.currentInspection.numeroCotizacion
    ).subscribe(result => {
          this.loadingServiceProvider.hideLoading();

          // console.log('loadInspectionDetails result.data', result.data);

          if(result.data.numDocumento !== null){
            ContextService.currentInspection = Object.assign(ContextService.currentInspection, result.data);
          }



          ContextService.carParts = [];
          ContextService.carDocuments = [];
          ContextService.carDamages = [];
          ContextService.accessories = []; 
          
          console.log('loadInspectionDetails currentInspection', ContextService.currentInspection);
          console.log('result.data', result.data);

          // this.navController.push(CustomerDataPage);
          ContextService.footerMenuOptions[0]['status'] = 2;
          ContextService.footerMenuOptions[1]['status'] = 2;
          ContextService.footerMenuOptions[2]['status'] = 1;
          return this.router.navigateByUrl('/car-legal-pictures');
        },
        error => {
          this.loadingServiceProvider.hideLoading();
          this.alertServiceProvider.show('Error', error);
        }
      );
  }

  // public getGlobalStrings(countryCode: string) {

  //   this.loadingServiceProvider.showLoading();

  //   this.stringsServiceProvider.getStrings(countryCode)
  //     .subscribe(result => {

  //       console.log(result);

  //       if (result.status && result.data != null) {
  //         ContextService.location.country = countryCode;
  //         ConfigService.strings = result.data;
  //         ConfigService.apiUrl = ConfigService.strings.servicesURL;
  //         //this.helperStrings.carmaxage = parseInt(result.data.carMaxAge);
  //         //console.log(this.helperStrings.carmaxage);

  //         console.log(ContextService.location);
  //         // this.navCtrl.push(LoginPage);
  //       }
  //       else {
  //         this.alertServiceProvider.show('Error', result.data);
  //       }

  //       this.loadingServiceProvider.hideLoading();
  //     });
  // }

}
