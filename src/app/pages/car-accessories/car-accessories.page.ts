import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { IonPullUpFooterState } from 'ionic-pullup';
import { AlertService } from 'src/app/services/infrastructure/alert/alert.service';
import { ConfigService } from 'src/app/services/infrastructure/config/config.service';
import { ConstantsService } from 'src/app/services/infrastructure/constants/constants.service';
import { ContextService } from 'src/app/services/infrastructure/context/context.service';
import { HelperStringsService } from 'src/app/services/infrastructure/helper-strings/helper-strings.service';
import { InspectionService } from 'src/app/services/remote/inspection/inspection.service';
import { LoadingService } from 'src/app/services/infrastructure/loading/loading.service';
import { LogInfoService } from 'src/app/services/infrastructure/log-info/log-info.service';
import { CarAccessoriesService } from 'src/app/services/remote/car-accessories/car-accessories.service';
import { CarDamageService } from 'src/app/services/remote/car-damage/car-damage.service';
import { ImagesService } from 'src/app/services/remote/images/images.service';

@Component({
  selector: 'app-car-accessories',
  templateUrl: './car-accessories.page.html',
  styleUrls: ['./car-accessories.page.scss'],
})
export class CarAccessoriesPage implements OnInit {

  footerState: IonPullUpFooterState;
  currentPage = 5;
  footerMenuOptions = [];
  strings: any = {};
  currentInspection: any = {};
  buttonEnabled: boolean = false;

  constructor(public navCtrl: NavController, 
              // public navParams: NavParams,
              public loadingServiceProvider: LoadingService,
              public carDamageProvider: CarDamageService,
              public imagesServiceProvider: ImagesService,
              public carAccessoriesProvider: CarAccessoriesService,
              public inspectionProvider : InspectionService,
              private alertServiceProvider: AlertService,
              private logInfoClient:LogInfoService,
              // private emarketInit: InitEMarket,
              private alertCtrl: AlertController,
              private helperStrings: HelperStringsService,
              private router: Router
              // private imagesServiceProviderRemote: ImagesService
              ) {
                
    this.footerState = IonPullUpFooterState.Collapsed;

    ContextService.footerMenuOptions[this.currentPage - 1]["status"] = 1;
    this.footerMenuOptions = ContextService.footerMenuOptions;
    this.currentInspection = ContextService.currentInspection;
  }

  ngOnInit() {
    this.strings = ConfigService.strings;

    if(ContextService.accessories.length == 0) {
      this.populateList();
    }

    console.log('ContextService.currentInspection', ContextService.currentInspection);

    // if (this.emarketInit.Enabled) {
    //   this.buttonEnabled = true;
    // }
  }

  populateList() {

    console.log("populateList");

    var defaultValues = [];

    if(this.isCountry([ConstantsService.GUATEMALA_CODE])) {
      defaultValues = [
        'Rueda 1', 'Rueda 2', 'Rueda 3', 'Rueda 4',
        'Cámara de retroceso en el bomper de atrás', 'Sensores de retroceso  en el bomper',
        'Radio o equipo de audio (ver si es original de fábrica)',
        'Sillones Delanteros',
        'Sillones Traseros'
      ];
    }
    else if(this.isCountry([ConstantsService.PANAMA_CODE])) {
      defaultValues = [];
    }
    else if(this.isCountry([ConstantsService.COSTARICA_CODE])) {
      defaultValues = ['Rueda 1', 'Rueda 2', 'Rueda 3', 'Rueda 4',
      'Pantalla táctil', 'Buffer', 'Amplificador', 'Rack',
      'Cámara de retroceso', 'Sensores de bumper',
      'Rompevientos techo', 'Rompevientos capo',
      'Estribo flotante', 'Defensas', 'Spoiler', 'Barra led delantera', 'Roll back', 'Protector de cama',
      'Manecilla cromada', 'Manoplas (moto)',
      'Furgón', 'Aros especiales', 'Copas'];
    }
    else {
      defaultValues = [
        'Rueda 1', 'Rueda 2', 'Rueda 3', 'Rueda 4',
        'Cámara de retroceso en el bomper de atrás', 'Sensores de retroceso  en el bomper',
        'Radio o equipo de audio (ver si es original de fábrica)'
      ];
    }

    for(var i = 0; i < defaultValues.length; i++) {

      ContextService.accessories.push({
        "numeroCotizacion":"",
        "marca":"",
        "referencia": defaultValues[i], // "Radio Desmontable",
        "valor":"",
        "byteFoto":"",
        "pais":""
      });
        

      // ContextService.accessories.push({
      //   'accesorio':{  
      //     'codCia':'1',
      //     'numInsp':ContextService.currentInspection.inspeccion.numInsp,
      //     'numSecu':'1',
      //     'numRiesgo':'1',
      //     // 'codTipAccesorio':String(this.carAccessoryTypeId),
      //     // 'codAccesorio':String(this.carAccessoryId),
      //     // 'valorAccesorio':String(this.accessoryValue),
      //     'codDano':'0',
      //     'obsAccesorio':'this.carAccessoryName',
      //     // 'codUsr':this.UserWebServices.username,
      //     // 'fecActu':dateFormat(new Date(), 'ddmmyyyy')
      //   },
      //   'foto':{  
      //     'codCia':'1',
      //     // 'numInsp': ContextService.currentInspection.inspeccion.numInsp,
      //     'numSecu':'1',
      //     'numRiesgo':'1',
      //     'tipoFoto':'ACCESORIO',
      //     // 'codigo':String(this.carAccessoryTypeId),
      //     // 'subCodigo':String(this.carAccessoryId),
      //     'latitud': String(ContextService.location.lat),
      //     'longitud': String(ContextService.location.long),
      //     'observaciones':'this.carAccessoryName',
      //     // 'bytes': this.base64Image,
      //     // 'codUsr':this.UserWebServices.username,
      //     // 'fecActu':dateFormat(new Date(), 'ddmmyyyy')
      //  }
      // });
    }
  }

  footerExpanded() {
    // console.log("Footer expanded!");
  }

  footerCollapsed() {
    // console.log("Footer collapsed!");
  }

  toggleFooter() {
    this.footerState =
      this.footerState == IonPullUpFooterState.Collapsed
        ? IonPullUpFooterState.Expanded
        : IonPullUpFooterState.Collapsed;
  }

  ionViewDidLoad() {
    // console.log("ionViewDidLoad CarAccessoriesPage");
  }

  public back() {
    this.navCtrl.pop();
  }

  // public exit(){
  //   this.alertExit("¿Estas seguro que deseas salir de la autoinspeccion y regresar al E-Market?");
  // }

  public next() {

    console.log('ContextService.accessories', ContextService.accessories);

    let accessoriesImages = [];

    for (let i = 0; i < ContextService.accessories.length; i++) { 

      let accessory = ContextService.accessories[i];

      console.log("accessory", accessory); 

      if(accessory['byteFoto'] != null && accessory['byteFoto'].length > 0){
        accessoriesImages.push(
          {
            "numeroCotizacion": this.currentInspection.numeroCotizacion,
            "marca":"",
            "referencia": accessory['referencia'],
            "valor": accessory['valor'],
            "byteFoto": accessory['byteFoto'],
            "pais": ContextService.location.country // this.strings.countryName //
          }        
        );
      }
    }
    
    // if(accessoriesImages.length > 0) {
    //   this.loadingServiceProvider.showLoading();

    //   this.imagesServiceProviderRemote.sendCarAccessories(accessoriesImages).subscribe(result => {
    //     this.loadingServiceProvider.hideLoading();

    //     if (result.status) {
    //       this.goToAcceptInspection();
    //     } 
    //     else {
    //       this.alertError();
    //     }
    //   });
    // }
    // else{
    //   this.goToAcceptInspection();
    // }

    this.goToAcceptInspection();
  }

  goToAcceptInspection() {
    ContextService.footerMenuOptions[this.currentPage - 1]["status"] = 2;
    // this.navCtrl.push(AcceptInspectionPage); 
    return this.router.navigateByUrl('/accept-inspection');
  }

  public addAccessory(){
    // this.navCtrl.push(CarAccessoryPage);
    ContextService.SelectedAccesory = null;
    return this.router.navigateByUrl('/car-accessory'); 
  } 

  public getAccessories(){
    // console.log(ContextService.accessories);=
    return ContextService.accessories;
  }

  public removeAccessory(index){

    this.alertServiceProvider.confirm('', this.strings.accesoruDeleteConfirm, 
      function(controller){
        ContextService.accessories.splice(index, 1);
        //controller.storageService.saveAccessories();
      }, 
      function(){

      }, this
    ); 

  }
  
  public openAccessory(index){

    ContextService.SelectedAccesory = { 
      accessoryIndex : index
    };

    return this.router.navigateByUrl('/car-accessory');

    // this.navCtrl.push(
    //   CarAccessoryPage, 
      // { 
      //   // picIndex: this.picIndex, 
      //   // callback: this.addDamageCallback, 
      //   // controller: this, 
      //   // title: this.title,
      //   accessoryIndex : index
      // }
    // );
  }

  public getAccessoryImage(accessory:any){

    // console.log("accessory", accessory.byteFot);

    return accessory && accessory.byteFoto && accessory.byteFoto.length > 0 ? 
           'data:image/jpeg;base64,' + accessory.byteFoto : 'assets/imgs/Camera_icon.png';

  }

  public isDisabled(){
    // return ContextService.userSession && !ContextService.currentInspection.new && 
    //       ContextService.userSession.tipUsuario == '';

    return false;
  }

  //

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

  // alertExit(msg:string) {
  //   let alert = this.alertCtrl.create({
  //     title: 'Información',
  //     message: msg,
  //     buttons: [
  //       {
  //         text: 'Aceptar',
  //         handler: () => {
  //           console.log('Acepted clicked');
  //           window.location.replace(this.helperStrings.ReturnURL);
  //         }
  //       },
  //       {
  //         text: 'Rechazar',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

  // alertError() {
  //   let alert = this.alertCtrl.create({
  //     title: 'Información',
  //     message: 'No fue posible enviar las fotografías. Intente nuevamente',
  //     buttons: [
  //       {
  //         text: 'Aceptar',
  //         handler: () => {
  //           //this.loadingServiceProvider.hideLoading();
  //           //console.log('Buy clicked');
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

  // public isCurrentCountryPA() {
  //   return ContextService.location.country === ConstantsService.PANAMA_CODE;
  // }

  public isCountry(list) {

    let exist = false;

    if(list && list.length > 0){
      list.forEach(element => {
        if(ContextService.location.country === element){
          exist = true;
        }
      });
    }

    return exist;
    // return ContextService.location.country === ConstantsService.GUATEMALA_CODE;
  }

}
