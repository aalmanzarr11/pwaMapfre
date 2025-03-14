import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, Platform } from '@ionic/angular';
import imageCompression from 'browser-image-compression';
import { AlertService } from 'src/app/services/infrastructure/alert/alert.service';
import { ConfigService } from 'src/app/services/infrastructure/config/config.service';
import { ConstantsService } from 'src/app/services/infrastructure/constants/constants.service';
import { ContextService } from 'src/app/services/infrastructure/context/context.service';
import { LoadingService } from 'src/app/services/infrastructure/loading/loading.service';
import { CarAccessoriesService } from 'src/app/services/remote/car-accessories/car-accessories.service';
import { ImagesService } from 'src/app/services/remote/images/images.service';
import { UserinfoWebService } from 'src/app/services/remote/userinfo-web/userinfo-web.service';

@Component({
  selector: 'app-car-accessory',
  templateUrl: './car-accessory.page.html',
  styleUrls: ['./car-accessory.page.scss'],
})
export class CarAccessoryPage implements OnInit {
//newImage: File;
  //private imgURI: any = '';

  public savePending: boolean = false;
  public selectedAccessory: any;
  public accessoryIndex: any;
  public strings: any = {};
  public base64Image: any = ''; //ImagesServiceProvider.image; 
  public carAccessoryId: string;
  public carAccessoryTypeId: string;
  public carAccessoryName: string = '';
  public accessoryValue: any;
  public carAccessories: any = {};
  public srcorientation: any;
  

  constructor(private navCtrl: NavController, 
              // private navParams: NavParams, 
              //private ng2ImgMax : Ng2ImgMaxService,
              // private ng2PicaService: Ng2PicaService,
              // private imageCompress: NgxImageCompressService,
              private loadingServiceProvider: LoadingService,
              private carAccessoriesProvider: CarAccessoriesService,
              private alertServiceProvider: AlertService,
              // private storageService:StorageServiceProvider,
              public platform: Platform,
              // public camera: Camera,
              private images: ImagesService,
              private alertCtrl: AlertController,
              private UserWebServices: UserinfoWebService,
              private router: Router) {


    // platform.registerBackButtonAction(() => {
    //   this.back();
    // }, 2);
    
  }

  ionViewDidLoad() {
    // if(!this.base64Image || this.base64Image.length == 0){
    //   setTimeout( () => {
    //     this.capture();
    //   }, 500);
    // }
 
  }
 

  ngOnInit() {
    // this.getAccessoryCodes();
    this.strings = ConfigService.strings;
    this.accessoryIndex = ContextService.SelectedAccesory ? ContextService.SelectedAccesory.accessoryIndex : null;// this.navParams.get('accessoryIndex');

    if(this.accessoryIndex != null){
      this.selectedAccessory = ContextService.accessories[this.accessoryIndex];
      this.base64Image = this.selectedAccessory.byteFoto;
      // this.carAccessoryTypeId = this.selectedAccessory.accesorio.codTipAccesorio;
      // this.carAccessoryId = this.selectedAccessory.accesorio.codAccesorio;
      this.carAccessoryName = this.selectedAccessory.referencia;
      this.accessoryValue = String(this.selectedAccessory.valor);
    }
    else{
      // this.carAccessoryName = this.strings.accesorySelect;
    }

    if(this.getUserType() === ''){
      this.accessoryValue = '0';
    }
    
  }

  private getAccessoryCodes() {
    this.loadingServiceProvider.showLoading();

    this.carAccessoriesProvider.getAccessoryCodes().subscribe(result => {
      if (result.status && result.data != null) {
        this.carAccessories = result.data.accesorios;
      } else {
        this.alertServiceProvider.show('Error', result.data);
      }

      this.loadingServiceProvider.hideLoading();
    });
  }

  takePicture(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      var base64 = reader.result; 
      compressImage(base64, file).then(compressed => {
        this.loadingServiceProvider.showLoading();
        var resizedBase64 = compressed as string;
        this.base64Image = resizedBase64.split(',')[1];
        this.savePending = true; 
        this.loadingServiceProvider.hideLoading();
      })
    }
    
    function compressImage(src, file) {
      return new Promise((res, rej) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {

          imageCompression.getExifOrientation(file).then(data => {
            const canvas = document.createElement('canvas');
            
            
            //nuevo tamaño
          
            if (img.width < 1500 || img.height < 1500) {
              var newWidth = img.width;
              var newHeight = img.height;
            } 

            else if (img.width < 4000 || img.height < 4000) {
              var newWidth = img.width*0.50;
              var newHeight = img.height*0.50;
            }

            else if (img.width > 4000 || img.height > 4000) {
              var newWidth = img.width*0.15;
              var newHeight = img.height*0.15;
            } 
 
          
          switch (data) {
            case 2: canvas.height = newHeight; canvas.width = newWidth; break;
            case 3: canvas.height = newHeight; canvas.width = newWidth; break;
            case 4: canvas.height = newHeight; canvas.width = newWidth; break;
            case 5: canvas.height = newHeight; canvas.width = newWidth; break;
            case 6: canvas.height = newHeight; canvas.width = newWidth; break;
            case 7: canvas.height = newHeight; canvas.width = newWidth; break;
            case 8: canvas.width = newHeight; canvas.height = newWidth; break;
            default: canvas.height = newHeight; canvas.width = newWidth; break;
          }

          const ctx = canvas.getContext('2d'); 
          switch (data) {
            case 2: ctx.transform(-1, 0, 0, 1, newWidth, 0); ctx.drawImage(img, 0, 0, newWidth, newHeight); break;
            case 3: ctx.transform(-1, 0, 0, -1, newWidth, newHeight); ctx.drawImage(img, 0, 0, newWidth, newHeight); break;
            case 4: ctx.transform(1, 0, 0, -1, 0, newHeight); ctx.drawImage(img, 0, 0, newWidth, newHeight); break;
            case 5: ctx.transform(0, 1, 1, 0, 0, 0); ctx.drawImage(img, 0, 0, newWidth, newHeight); break;
            case 6: ctx.transform(1, 0, 0, 1, 0, 0); ctx.drawImage(img, 0, 0, newWidth, newHeight); break;
            case 7: ctx.transform(0, -1, -1, 0, newHeight, newWidth); ctx.drawImage(img, 0, 0, newWidth, newHeight); break;
            case 8: ctx.transform(0, -1, 1, 0, 0, newWidth); ctx.drawImage(img, 0, 0, newWidth, newHeight); break;
            default: ctx.drawImage(img, 0, 0, newWidth, newHeight); break;
          }
            //ctx.drawImage(img, 0, 0, newW, newH);
            const b64 = ctx.canvas.toDataURL("image/jpeg", 0.4);
            res(b64);
          });
        }
        img.onerror = error => rej(error);
      })
    }
  }

  // getImagePreview(file: File) {
  //   const reader: FileReader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     this.imgURI = reader.result;
  //     //console.log(this.imgURI);
  //     this.base64Image = this.imgURI.split(',')[1];
  //     //console.log(this.base64Image);
  //     this.savePending = true;
  //     this.loadingServiceProvider.hideLoading();
  //   };
  // }
  
  public capture(){
    document.getElementById("cap").click();
  }

  // public takePicture(){
  
  //   const options: CameraOptions = {
  //     quality: 80,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     correctOrientation : true,
  //     targetWidth : 800,
  //     targetHeight : 800
  //   };

  //   this.camera.getPicture(options).then(
  //     imageData => {
  //       this.base64Image = imageData;
  //       this.savePending = true;
  //     },
  //     () => { }
  //   );

  // }

  public openList(controller:any, name:any, list:any, callback:any, loadAtStart:boolean){
    // this.navCtrl.push(ModalSelectPage, {listName:name, itemList:list, 
    //   controllerSrc:controller, callbackList:callback, loadAtStart:loadAtStart});
    ContextService.ModalSelectParametes = {
      listName:name, 
      itemList:list, 
      controllerSrc:controller, 
      callbackList:callback, 
      loadAtStart:loadAtStart
    };
    return this.router.navigateByUrl('/modal-select');
  }

  public callbackList(item, listName, controller){

    if(listName == 'accessories'){
      controller.carAccessoryTypeId = item.codTipAccesorio;
      controller.carAccessoryId = item.codAccesorio;
      controller.carAccessoryName = item.descAccesorio;
    }

  }

  public back(){
    if(this.savePending){

      this.alertServiceProvider.confirm('', this.strings.discardPictureConfirm, 
        function(controller){
          controller.navCtrl.pop();
        }, 
        function(){

        }, this
      ); 

    }
    else{
      this.navCtrl.pop();
    }
  }

  public setPicture(){
    
    // if(){
    //   this.accessoryValue = '0'; 
    // }

    // if(!this.base64Image || !this.carAccessoryId){
 

    if(!this.accessoryValue || this.accessoryValue === undefined || this.accessoryValue == ''){
      this.accessoryValue = '0';
    }

    this.selectedAccessory = {
      "numeroCotizacion": ContextService.currentInspection.numeroCotizacion,
      "marca": "",
      "referencia": this.carAccessoryName, // "Radio Desmontable",
      "valor": String(this.accessoryValue),
      "byteFoto": this.base64Image,
      //"pais": ContextService.location.country
    };

    // this.loadingServiceProvider.showLoading();

    // let accessory = {  
    //   'accesorio':{  
    //     'codCia':'1',
    //     'numInsp':ContextService.currentInspection.inspeccion.numInsp,
    //     'numSecu':'1',
    //     'numRiesgo':'1',
    //     'codTipAccesorio':String(this.carAccessoryTypeId),
    //     'codAccesorio':String(this.carAccessoryId),
    //     'valorAccesorio':String(this.accessoryValue),
    //     'codDano':'0',
    //     'obsAccesorio':this.carAccessoryName,
    //     'codUsr':this.UserWebServices.username,
    //     'fecActu':dateFormat(new Date(), 'ddmmyyyy')
    //   },
    //   'foto':{  
    //     'codCia':'1',
    //     'numInsp': ContextService.currentInspection.inspeccion.numInsp,
    //     'numSecu':'1',
    //     'numRiesgo':'1',
    //     'tipoFoto':'ACCESORIO',
    //     'codigo':String(this.carAccessoryTypeId),
    //     'subCodigo':String(this.carAccessoryId),
    //     'latitud': String(ContextService.location.lat),
    //     'longitud': String(ContextService.location.long),
    //     'observaciones':this.carAccessoryName,
    //     'bytes': this.base64Image,
    //     'codUsr':this.UserWebServices.username,
    //     'fecActu':dateFormat(new Date(), 'ddmmyyyy')
    //  }
    // };

    // //console.log("accessory", accessory);
    // //console.log("this.accessoryIndex", this.accessoryIndex);


    
    this.syncPhotos();
    
    // this.storageService.saveAccessories();
    // this.savePending = false;
    
    // setTimeout( () => {
    //   this.loadingServiceProvider.hideLoading();
    //   this.back();
    // this.navCtrl.pop();
    // }, 500);

  }

  public syncPhotos(){ 

  //   var Foto = {  
  //       'codCia':'1',
  //       'numInsp': ContextService.currentInspection.inspeccion.numInsp,
  //       'numSecu':'1',
  //       'numRiesgo':'1',
  //       'tipoFoto':'ACCESORIO',
  //       'codigo':String(this.carAccessoryTypeId),
  //       'subCodigo':String(this.carAccessoryId),
  //       'latitud': String(ContextService.location.lat),
  //       'longitud': String(ContextService.location.long),
  //       'observaciones':this.carAccessoryName,
  //       'bytes': this.base64Image,
  //       'codUsr':this.UserWebServices.username,
  //       'fecActu':dateFormat(new Date(), 'ddmmyyyy')
  // }

  // ContextService.accessories[this.accessoryIndex]
  this.uploadPhotos(this.selectedAccessory);
}

public uploadPhotos(carPhoto: any) {
  ////console.log(carPhoto);
  ////console.log("Enviando Fotos")
  this.loadingServiceProvider.showLoading();

  this.images.sendCarAccessories(carPhoto).subscribe(result => {
    ////console.log(result);
    this.loadingServiceProvider.hideLoading();
    if (result.status) {
      // this.storageService.saveAccessories();

      if(this.accessoryIndex != null){
        ContextService.accessories[this.accessoryIndex] = carPhoto;
      }
      else{
        ContextService.accessories.push(carPhoto);
      }

      this.savePending = false;
      this.back();
    } else {
      this.alertServiceProvider.show('Información', 'No fue posible enviar la foto. Intente nuevamente');
    }
  });
}

// alertError() {
//   let alert = this.alertCtrl.create({
//     title: 'Información',
//     message: 'No fue posible enviar la foto. Intente nuevamente',
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

  public isDisabled(){
    // return !ContextService.currentInspection.new && 
    //       ContextService.userSession.tipUsuario == '';
    return false;
  }

  public getUserType(){
    return ContextService.userSession.tipUsuario;
  }

  public cleanField($event: any) {
    const searchRegExp = /[^0-9.,]/g;
    let oldValue = $event.target.value;
    // event.target.value = newValue.replace(searchRegExp, '');
    let newValue = oldValue.replace(searchRegExp, '');
    $event.target.value = newValue;

    setTimeout(function(){
      this.accessoryValue = newValue;
    }.bind(this), 50);
  }

 

}
