import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { NavController } from "@ionic/angular";
import { Router, RouterOutlet } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { IonPullUpFooterState } from 'ionic-pullup';
import { AlertService } from 'src/app/services/infrastructure/alert/alert.service';
import { ConfigService } from 'src/app/services/infrastructure/config/config.service';
import { ConstantsService } from 'src/app/services/infrastructure/constants/constants.service';
import { ContextService } from 'src/app/services/infrastructure/context/context.service';
import { InspectionService } from 'src/app/services/remote/inspection/inspection.service';
import { LoadingService } from 'src/app/services/infrastructure/loading/loading.service';
import { LogInfoService } from 'src/app/services/infrastructure/log-info/log-info.service';
import { EnvironmentService } from 'src/app/services/infrastructure/environment/environment.service';

@Component({
  selector: 'app-enter-car',
  templateUrl: './enter-car.page.html',
  styleUrls: ['./enter-car.page.scss'],
})
export class EnterCarPage implements OnInit {

  @ViewChild('documentInput') documentInput: IonInput;
  @ViewChild('plateInput') plateInput: IonInput;

  footerState: IonPullUpFooterState;
  formGroup: UntypedFormGroup;
  car: any = { plate: '' };
  footerMenuOptions: any = [];
  currentPage: any = 1;
  currentInspection: any = {};
  strings: any = {};
  constantsProvider: any = {};

  constructor(
      public navController: NavController,
      // private storageService: StorageServiceProvider,
      // public navParams: NavParams,
      private alertServiceProvider: AlertService,
      private loadingServiceProvider: LoadingService,
      private inspectionProvider: InspectionService,
      private logInfoClient: LogInfoService,
      public formBuilder: UntypedFormBuilder,
      private router: Router,
      // private routerOutlet:RouterOutlet
    ) {

    this.footerState = IonPullUpFooterState.Collapsed;
    // ContextService.init();
    ContextService.footerMenuOptions[this.currentPage - 1]['status'] = 1;
    this.footerMenuOptions = ContextService.footerMenuOptions;
    this.currentInspection = ContextService.currentInspection;
    this.constantsProvider = ConstantsService;

    if (!EnvironmentService.isProduction) {
      // this.currentInspection.numeroCotizacion = 'E1-SP-24-11481';
      this.currentInspection.numDocumento = "0101200000000";
    }

  }

  ionViewDidLoad() {
    //console.log('EnterCarPage ionViewDidLoad');
  }

  ionViewDidEnter() {
    //console.log('EnterCarPage ionViewDidEnter');
    ContextService.init();
  }

  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      document: new UntypedFormControl('', []),
      plate: new UntypedFormControl('', []),
      policy: new UntypedFormControl('', []) // Validators.compose([Validators.maxLength(12), Validators.pattern('[0-9]*')])),
    });

    this.strings = ConfigService.strings;
 
  }

  footerExpanded() {
    // //console.log('Footer expanded!');
  }

  footerCollapsed() {
    // //console.log('Footer collapsed!');
  }

  toggleFooter() {
    this.footerState = this.footerState == IonPullUpFooterState.Collapsed ?
      IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
  }
 
 

  // BOTON ATRAS VOLVER A LOGIN
  public back() {
    this.navController.pop();
    // this.routerOutlet.detach();
  }

  public isEmpty(str) {
    return (!str || str.length === 0 );
  }


  // BOTON NEXT VALIDACION DE DOCUMENTO Y PLACA
  public next() {

    // if(ContextService.userSession.userType !== 'P' && this.isEmpty(this.currentInspection.placa)){
    //   this.alertServiceProvider.show('', 'Debe ingresar la placa');
    //   return;
    // }

    // if(this.isEmpty(this.currentInspection.numDocumento) && this.isEmpty(this.currentInspection.placa) && 
    //   (this.isEmpty(this.currentInspection.numeroCotizacion) || !this.showPolicyField())){
    //     this.alertServiceProvider.show('', this.strings.generalFormValidationError);
    //   return;
    // }
 
    if(this.isEmpty(this.currentInspection.numDocumento) && this.isEmpty(this.currentInspection.placa) && 
    (this.isEmpty(this.currentInspection.numeroCotizacion) || !this.showPolicyField())){
      this.alertServiceProvider.show('', this.strings.generalFormValidationError);
      return;
  }
    // //console.log('ContextService.location.country', ContextService.location.country);
    // //console.log('ConstantsService.GUATEMALA_CODE', ConstantsService.GUATEMALA_CODE);

    // constantsProvider.HONDURAS_CODE

    // // //console.log('this.formGroup', this.formGroup);
    // var isValid = this.isEmpty(this.currentInspection.numDocumento) && this.isEmpty(this.currentInspection.placa) &&
    // this.isEmpty(this.currentInspection.placa)

    // StringsServiceProvider.
    // alert("ContextService.userSession.userType: " + ContextService.userSession.userType);


    // if (isValid) {

    // public static footerMenuOptions : any = [];

    this.loadInspections();


      // this.storageService.loadInspection(this.currentInspection, this, this.loadCallback);
    // } else {
    //   this.alertServiceProvider.show('', this.strings.generalFormValidationError);
    // }
  }

  public loadInspections(){
    this.loadingServiceProvider.showLoading();

      this.inspectionProvider.loadInspections(
        this.currentInspection.numDocumento,
        this.currentInspection.placa,
        this.currentInspection.numeroCotizacion
      ).subscribe(result => {

          this.loadingServiceProvider.hideLoading();

          
          // TODO: Validar si los datos no están en null
          //console.log('result', result);


          if (result != null && result.data != null && result.data.length > 0) {
            // ContextService.footerMenuOptions[this.currentPage - 1]['status'] = 2;
            // this.navController.push(InspectionListPage, { inspections: result.data });
            // this.navController.push(CustomerDataPage);


            if(result.data.length > 1){
              // this.navController.push(
              //   InspectionListPage,
              //   // { inspections: [ContextService.currentInspection] }
              //   { inspections: result.data }
              // );
              ContextService.footerMenuOptions[this.currentPage - 1]['status'] = 2;
              ContextService.inspectionList = result.data;
              return this.router.navigateByUrl('/inspection-list');
            }
            else{
              if(result.data[0].numeroCotizacion != null) {
                ContextService.currentInspection.numeroCotizacion = result.data[0].numeroCotizacion;
              }
              else if(result.data[0].poliza != null) {
                ContextService.currentInspection.numeroCotizacion = result.data[0].poliza;
              }
              else{
                this.alertServiceProvider.show('', 'No se encontraron cotizaciones asociadas');
                return;
              }
  
              this.loadInspectionDetails();
            }

          } else {

            // //console.log('ContextService.location.country', ContextService.location.country);
            // //console.log('ConstantsService.GUATEMALA_CODE', ConstantsService.GUATEMALA_CODE);

            this.alertServiceProvider.show('', 'No se encontraron cotizaciones asociadas');

            


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

  public getInspectionNumber() {

    this.loadingServiceProvider.showLoading();

    var body = {
      'placa': this.currentInspection.placa,
      'marca': '',
      'linea': '',
      'version':'',
      'modelo':'',
      'codFase':'',
      'motor':'',
      'chasis':'',
      'serie':'',
      'uso':'',
      'color':'', 
    };

    this.inspectionProvider.updateInspection(body).subscribe(result => {
          this.loadingServiceProvider.hideLoading();

          //console.log('updateInspection result', result.data);

          if(result.data && result.data.mensaje) {
            ContextService.currentInspection.numeroCotizacion = result.data.mensaje;
            // this.navController.push(CustomerDataPage);
            return this.router.navigateByUrl('/customer-data');
          }
          else{
            this.alertServiceProvider.show('', 'No se pudo crear la cotización');
          }
          

          // if(result.data.numDocumento !== null){
          //   ContextService.currentInspection = Object.assign(ContextService.currentInspection, result.data);
          // }
          
          // this.navController.push(CustomerDataPage);
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

          // //console.log('loadInspectionDetails result.data', result.data);

          if(result.data.numDocumento !== null){
            ContextService.currentInspection = Object.assign(ContextService.currentInspection, result.data);
          }

          ContextService.carParts = [];
          ContextService.carDocuments = [];
          ContextService.carDamages = [];
          ContextService.accessories = []; 
          
          //console.log('loadInspectionDetails currentInspection', ContextService.currentInspection);
          // this.navController.push(CustomerDataPage);
          ContextService.footerMenuOptions[this.currentPage - 1]['status'] = 2;
          return this.router.navigateByUrl('/customer-data');
        },
        error => {
          this.loadingServiceProvider.hideLoading();
          this.alertServiceProvider.show('Error', error);
        }
      );
  }

  // ESTADO DE MENU FOOTER
  public onFocusInput() {
    this.footerState = IonPullUpFooterState.Collapsed;
  }

  // TECLA ENTER VALIDACION
  public onKeyupEnter($event: any) {
    const elementName = $event.srcElement.name;

    if (elementName == 'document') {
      setTimeout(() => {
        this.plateInput.setFocus();
      }, 150);
    } else if (elementName == 'plate') {
      this.next();
    }
  }

  public showPolicyField() {

    return false

  //   switch(ContextService.location.country) { 
  //     case ConstantsService.PANAMA_CODE:
  //     case ConstantsService.ELSALVADOR_CODE: { 
  //        return true;
  //     } 
  //     default: { 
  //       return true;
  //     } 
  //  } 
  }

 
}
