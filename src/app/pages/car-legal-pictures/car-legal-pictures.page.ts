import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { IonPullUpFooterState } from 'ionic-pullup';
import { AlertService } from 'src/app/services/infrastructure/alert/alert.service';
import { ConfigService } from 'src/app/services/infrastructure/config/config.service';
import { ConstantsService } from 'src/app/services/infrastructure/constants/constants.service';
import { ContextService } from 'src/app/services/infrastructure/context/context.service';
import { EnvironmentService } from 'src/app/services/infrastructure/environment/environment.service';
import { LoadingService } from 'src/app/services/infrastructure/loading/loading.service';
import { LogInfoService } from 'src/app/services/infrastructure/log-info/log-info.service';
import { CarPartsService } from 'src/app/services/remote/car-parts/car-parts.service';
import { ImagesService } from 'src/app/services/remote/images/images.service';

@Component({
  selector: 'app-car-legal-pictures',
  templateUrl: './car-legal-pictures.page.html',
  styleUrls: ['./car-legal-pictures.page.scss'],
})
export class CarLegalPicturesPage implements OnInit {


  footerState: IonPullUpFooterState;
  currentPage = 3;
  footerMenuOptions = [];
  carDocuments = [];
  strings: any = {};
  currentInspection: any = {};

  constructor(private navCtrl: NavController,
              // public navParams: NavParams,
              private loadingServiceProvider: LoadingService,
              private alertServiceProvider: AlertService,
              private carPartsProvider: CarPartsService,
              private logInfoClient: LogInfoService,
              private alertCtrl: AlertController,
              private imagesServiceProviderRemote: ImagesService,
              private router: Router) {

    this.footerState = IonPullUpFooterState.Collapsed;
    ContextService.footerMenuOptions[this.currentPage - 1]['status'] = 1;
    this.footerMenuOptions = ContextService.footerMenuOptions;
    this.currentInspection = ContextService.currentInspection;
  }

  ngOnInit() {
    this.strings = ConfigService.strings;

    //console.log('ContextService.currentInspection', ContextService.currentInspection);
  }

  ionViewDidLoad() {}

  ionViewDidEnter() {
    this.getCarParts();
  }

  getCarParts() {
    // this.loadingServiceProvider.showLoading();

    // this.carDocumentsProvider.getParts().subscribe(result => {
    //   if (result.status && result.data != null) {
    //     this.carDocuments = result.data.partes.filter(item => {
    //       return item['codParte'].toLowerCase() > 11;
    //     });
    //   }
    //   else {
    //     this.alertServiceProvider.show('Error', result.data);
    //   }

    //   // this.loadingServiceProvider.hideLoading();
    // });

    // //console.log("country", ContextService.location.country);
    // //console.log("NICARAGUA_CODE_ISO", ConstantsService.NICARAGUA_CODE_ISO);

    
      this.carDocuments = [
        {
          'codParte': '15',
          'descParte': 'LICENCIA DE CONDUCIR <br />(Cara frontal)'
        },
        {
          'codParte': '16',
          'descParte': 'LICENCIA DE CONDUCIR <br />(Cara posterior)'
        },
        {
          'codParte': '17',
          'descParte': 'CHASIS/VIN'
        },
        {
          'codParte': '18',
          'descParte': 'CÉDULA DE IDENTIDAD<br />(Cara frontal)'
        },
        {
          'codParte': '19',
          'descParte': 'CÉDULA DE IDENTIDAD<br />(Cara posterior)'
        },
        {
          'codParte': '20',
          'descParte': 'RITEVE'
        }
      ];
      

  }

  footerExpanded() {
    // //console.log("Footer expanded!");
  }

  footerCollapsed() {
    // //console.log("Footer collapsed!");
  }

  toggleFooter() {
    this.footerState = this.footerState == IonPullUpFooterState.Collapsed
        ? IonPullUpFooterState.Expanded
        : IonPullUpFooterState.Collapsed;
  }

  public takePicture(index) {

    if (index.length === 0) {
      // this.navCtrl.push(CarMoreLegalPicturesPage);
      return this.router.navigateByUrl('/car-more-legal-pictures');
    } else {
      const part = this.carDocuments.filter(item => {
        return item['codParte'] === String(index);
      });

      if (part.length > 0) {
        // this.navCtrl.push(CarTakeLegalPicturesPage, {picIndex : index, title : part[0].descParte.toLowerCase()});
        ContextService.SelectedCarPicture = {picIndex : index, title : part[0].descParte.toLowerCase()};
        return this.router.navigateByUrl('/car-take-legal-pictures');
      } else {
        // this.navCtrl.push(CarMoreLegalPicturesPage);
        return this.router.navigateByUrl('/car-more-legal-pictures');
      }
    }
  }

  public checkLegalImage(index) {
    
    // //console.log("checkLegalImage", index, ContextService.carDocuments[index]);

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
    

    let documentImages = [];

    for (let i = 13; i < 21; i++) { 
 
      let checkLegalImage = this.checkLegalImage(i);
 

      // if(checkLegalImage){
      //   documentImages.push({
      //     'usuario':ContextService.userSession.nomUsuario,
      //     'numeroCotizacion': this.currentInspection.numeroCotizacion,
      //     'tipoDocumento': ContextService.carDocuments[i]['tipoDocumento'],
      //     'byteFoto': ContextService.carDocuments[i]['byteFoto'],
      //     'pais': ContextService.location.country // this.strings.countryName //
      //     }
      //   );
      // }
      // else{
        
      // }
      
      //if (!checkLegalImage && this.strings['carPicsPart_Mandatory_' + i] && this.strings['carPicsPart_Mandatory_' + i] == '1') {
      if (!checkLegalImage && this.strings['carPicsPart_Mandatory_' + i] && this.strings['carPicsPart_Mandatory_' + i] == '1' && EnvironmentService.isProduction) {

        // const part = this.carDocuments.filter(item => {
        //   return item['codParte'] === String(i);
        // });

        // //console.log("part", part, String(i));

        // if(part.length > 0 && part[0]){
        //   // this.alertServiceProvider.show('', this.strings.carPicsError + part[0].descParte.toLowerCase());
        //   return;
        // } 

        

        this.alertServiceProvider.show('', 'Debe tomar todas las fotografías');
        return;

      }
      
    }

    // if(documentImages.length > 0) {
    //   this.loadingServiceProvider.showLoading();

    //   this.imagesServiceProviderRemote.sendCarDocuments(documentImages).subscribe(result => {
    //     this.loadingServiceProvider.hideLoading();

    //     if (result.status) {
    //       this.goToCarPictures();
    //     } 
    //     else {
    //       this.alertError();
    //     }

    //   });
    // }
    // else{
      this.goToCarPictures();
    // }

  }

  goToCarPictures(){
    ContextService.footerMenuOptions[this.currentPage - 1]['status'] = 2;
    // this.navCtrl.push(CarPicturesPage);
    return this.router.navigateByUrl('/car-pictures');
  }

  // alertError() {
  //   let alert = this.alertCtrl.create({
  //     title: 'Información',
  //     message: 'No fue posible enviar las fotografías. Intente nuevamente',
  //     buttons: [
  //       {
  //         text: 'Aceptar',
  //         handler: () => {
  //           //this.loadingServiceProvider.hideLoading();
  //           ////console.log('Buy clicked');
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

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
  //   for (let carPart of ContextService.carDocuments) {
  //     if(carPart && carPart.damages){
  //       for (let damage of carPart.damages) {
  //         if(damage){

  //           this.loadingServiceProvider.showLoading();

  //           this.carDamageProvider.uploadDamage(damage.dano).subscribe(result => {

  //             // //console.log(result);

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

  //         // //console.log(result);

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
  //   for (let carPhoto of ContextService.carDocuments) {
  //     if(carPhoto && carPhoto.foto && carPhoto.foto.bytes && carPhoto.foto.bytes.length > 0){
  //       this.uploadPhotos(carPhoto.foto);
  //     }
  //   }

  //   for (let carPart of ContextService.carDocuments) {
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

  //     // //console.log(result);

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
