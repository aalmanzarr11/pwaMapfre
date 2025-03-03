import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router'; 
import { NavController } from '@ionic/angular';
import { IonPullUpFooterState } from 'ionic-pullup';
import { AlertService } from 'src/app/services/infrastructure/alert/alert.service';
import { ConfigService } from 'src/app/services/infrastructure/config/config.service';
import { ConstantsService } from 'src/app/services/infrastructure/constants/constants.service';
import { ContextService } from 'src/app/services/infrastructure/context/context.service';
import { LoadingService } from 'src/app/services/infrastructure/loading/loading.service';
import { LogInfoService } from 'src/app/services/infrastructure/log-info/log-info.service';
import { CarPartsService } from 'src/app/services/remote/car-parts/car-parts.service';

@Component({
  selector: 'app-car-more-legal-pictures',
  templateUrl: './car-more-legal-pictures.page.html',
  styleUrls: ['./car-more-legal-pictures.page.scss'],
})
export class CarMoreLegalPicturesPage implements OnInit {


  footerState: IonPullUpFooterState;
  currentPage = 3;
  footerMenuOptions = [];
  carDocuments = [];
  strings: any = {};
  currentInspection: any = {};
  currentCarType = 0;

  constructor(private navCtrl: NavController,
              // public navParams: NavParams,
              private loadingServiceProvider: LoadingService,
              private alertServiceProvider: AlertService,
              private carPartsProvider: CarPartsService,
              private logInfoClient: LogInfoService,
              private router: Router) {

    this.footerState = IonPullUpFooterState.Collapsed;
    ContextService.footerMenuOptions[this.currentPage - 1]['status'] = 1;
    this.footerMenuOptions = ContextService.footerMenuOptions;
    this.currentInspection = ContextService.currentInspection;
  }

  ngOnInit() {
    this.strings = ConfigService.strings;
  }

  ionViewDidLoad() {}

  ionViewDidEnter() {
    this.getCarParts();
  }

  setCarType(type) {
    this.currentCarType = type;
    this.getCarParts();
    console.log('this.currentCarType', this.currentCarType);
  }

  getCarParts() {
    // this.loadingServiceProvider.showLoading();

    // this.carPartsProvider.getParts().subscribe(result => {
    //   if (result.status && result.data != null) {
    //     this.carParts = result.data.partes.filter(item => {
    //       return item['codParte'].toLowerCase() > 11;
    //     });
    //   }
    //   else {
    //     this.alertServiceProvider.show('Error', result.data);
    //   }

    //   // this.loadingServiceProvider.hideLoading();
    // });

    if (ContextService.location.country === ConstantsService.PANAMA_CODE) {
      this.carDocuments = [
        {
          'codParte': '15',
          'descParte': 'Proforma o Registro Vehicular)'
        },
        {
          'codParte': '16',
          'descParte': 'Foto de cédula (nacionales) o fotocopia de pasaporte (extranjeros)'
        },
        {
          'codParte': '17',
          'descParte': 'Licencia vehicular'
        }
      ];
    }
    else if (ContextService.location.country === ConstantsService.NICARAGUA_CODE) {
      this.carDocuments = [
        {
          'codParte': '15',
          'descParte': 'Número de chasis (obligatorio)'
        },
        {
          'codParte': '16',
          'descParte': 'Foto de cédula (nacionales) o fotocopia de pasaporte (extranjeros) anverso (opcional)'
        },
        {
          'codParte': '17',
          'descParte': 'Foto de cédula (nacionales) o fotocopia de pasaporte (extranjeros) reverso (opcional)'
        }
      ];
    }

    // if (this.currentCarType === 0) {
    //   this.carDocuments.push(
    //     {
    //       'codParte': '17',
    //       'descParte': 'Proforma ó factura de compra'
    //     }
    //   );
    // } else {
    //   this.carDocuments.push(
    //     {
    //     'codParte': '17',
    //     'descParte': 'Fotocopia de registro de propiedad vehicular del auto asegurar'
    //     }
    //   );
    // }
  }

  footerExpanded() {
    // console.log("Footer expanded!");
  }

  footerCollapsed() {
    // console.log("Footer collapsed!");
  }

  toggleFooter() {
    this.footerState = this.footerState == IonPullUpFooterState.Collapsed
        ? IonPullUpFooterState.Expanded
        : IonPullUpFooterState.Collapsed;
  }

  public takePicture(index) {

    const part = this.carDocuments.filter(item => {
      return item['codParte'] === String(index);
    });

    if (part.length > 0) {
      // this.navCtrl.push(CarTakeLegalPicturesPage, {picIndex : index, title : part[0].descParte.toLowerCase()});
      ContextService.SelectedCarPicture = {picIndex : index, title : part[0].descParte.toLowerCase()};
        return this.router.navigateByUrl('/car-take-legal-pictures');
    }

  }

  public checkLegalImage(index) {
    
    // console.log("checkLegalImage", index, ContextService.carDocuments[index]);

    return ContextService.carDocuments != null &&
           ContextService.carDocuments[index] != null &&
           ContextService.carDocuments[index]['byteFoto'] !== '';

  }

  public getLegalImage(index) {
    if (this.checkLegalImage(index)) {
      return 'data:image/jpeg;base64,' + ContextService.carDocuments[index]['byteFoto'];
    }
  }

  public back() {
    this.navCtrl.pop();
  }

  public next() {


    this.back();


    // for (let i = 12; i < 16; i++) {
    //   if (!this.checkLegalImage(i) && this.strings['carPicsPart_Mandatory_' + i] == '1' && EnvironmentServiceProvider.isProduction) {

    //     const part = this.carParts.filter(item => {
    //       return item['codParte'] === String(i);
    //     });

    //     this.alertServiceProvider.show('', this.strings.carPicsError + part[0].descParte.toLowerCase());
    //     return;
    //   }
    // }
    // this.logInfoClient.createLogInfo('toma  fotografía documentación', this.currentInspection.riesgo.codPlaca, ContextService.currentInspection.inspeccion.numInsp, '')
    //                                 .subscribe(res => {
    //                                   console.log('Respuesta', res)
    //                                 }, err => {
    //                                   console.log('Error at log', err)
    //                                 });

    // ContextService.footerMenuOptions[this.currentPage - 1]['status'] = 2;
    // console.log(ContextService.userSession);
    // this.navCtrl.push(CarPicturesPage);

    // if(ContextService.userSession.tipUsuario === 'P'){
    //   this.navCtrl.push(AcceptInspectionPage);
    // }
    // else{
    //   this.uploadInspection();
    // }
  }

  // public uploadInspection(){

  //   this.loadingServiceProvider.showLoading();

  //   this.inspectionProvider.uploadInspection().subscribe(result => {

  //     if (result && result.status) {

  //       this.loadingServiceProvider.controller = this;
  //       this.loadingServiceProvider.callback = this.uploadInspectionCallback;

  //       this.uploadDamages();
  //       this.uploadAccessories();
  //       this.syncPhotos();
  //     }
  //     else {
  //       this.alertServiceProvider.show("Error", result.data);
  //     }

  //     this.loadingServiceProvider.hideLoading();

  //   });
  // }

  // public uploadDamages(){
  //   for (let carPart of ContextService.carParts) {
  //     if(carPart && carPart.damages){
  //       for (let damage of carPart.damages) {
  //         if(damage){

  //           this.loadingServiceProvider.showLoading();

  //           this.carDamageProvider.uploadDamage(damage.dano).subscribe(result => {

  //             // console.log(result);

  //             if (result && result.status) {

  //             }
  //             else {
  //               // this.alertServiceProvider.show("Error", result.data);
  //             }

  //             this.loadingServiceProvider.hideLoading();

  //           });

  //         }
  //       }
  //     }
  //   }
  // }

  // public uploadAccessories(){
  //   for (let accessory of ContextService.accessories) {
  //     if(accessory){
  //       this.loadingServiceProvider.showLoading();

  //       this.carAccessoriesProvider.uploadAccessory(accessory.accesorio).subscribe(result => {

  //         // console.log(result);

  //         if (result && result.status) {

  //         }
  //         else {
  //           // this.alertServiceProvider.show("Error", result.data);
  //         }

  //         this.loadingServiceProvider.hideLoading();

  //       });

  //     }
  //   }
  // }

  // public syncPhotos(){
  //   for (let carPhoto of ContextService.carParts) {
  //     if(carPhoto && carPhoto.foto && carPhoto.foto.bytes && carPhoto.foto.bytes.length > 0){
  //       this.uploadPhotos(carPhoto.foto);
  //     }
  //   }

  //   for (let carPart of ContextService.carParts) {
  //     if(carPart && carPart.damages){
  //       for (let damage of carPart.damages) {
  //         if(damage && damage.foto && damage.foto.bytes && damage.foto.bytes.length > 0){
  //           this.uploadPhotos(damage.foto);
  //         }
  //       }
  //     }
  //   }

  //   for (let accessory of ContextService.accessories) {
  //     if(accessory && accessory.foto && accessory.foto.bytes && accessory.foto.bytes.length > 0){
  //       this.uploadPhotos(accessory.foto);
  //     }
  //   }
  // }

  // public uploadPhotos(carPhoto:any){
  //   this.loadingServiceProvider.showLoading();

  //   this.imagesServiceProvider.uploadImage(carPhoto).subscribe(result => {

  //     // console.log(result);

  //     if (result && result.status) {

  //     }
  //     else {
  //       // this.alertServiceProvider.show("Error", result.data);
  //     }

  //     this.loadingServiceProvider.hideLoading();

  //   });
  // }

  // public uploadInspectionCallback(controller:any){
  //   controller.navCtrl.push(CarInspectionSuccessPage);
  // }

  public isDisabled() {
    // return ContextService.userSession && !ContextService.currentInspection.new &&
    //       ContextService.userSession.tipUsuario == '';
    return false;
  }

}
