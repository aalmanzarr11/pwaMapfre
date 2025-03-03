import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, Platform } from '@ionic/angular';
import imageCompression from 'browser-image-compression';
import { AlertService } from 'src/app/services/infrastructure/alert/alert.service';
import { ConfigService } from 'src/app/services/infrastructure/config/config.service';
import { ConstantsService } from 'src/app/services/infrastructure/constants/constants.service';
import { ContextService } from 'src/app/services/infrastructure/context/context.service';
import { LoadingService } from 'src/app/services/infrastructure/loading/loading.service';
import { CarDamageService } from 'src/app/services/remote/car-damage/car-damage.service';
import { CarSubpartsService } from 'src/app/services/remote/car-subparts/car-subparts.service';
import { ImagesService } from 'src/app/services/remote/images/images.service';
import { UserinfoWebService } from 'src/app/services/remote/userinfo-web/userinfo-web.service';

@Component({
  selector: 'app-car-damage',
  templateUrl: './car-damage.page.html',
  styleUrls: ['./car-damage.page.scss'],
})
export class CarDamagePage implements OnInit {


  public strings: any;
  public base64Image: any = ''; // ImagesService.image;
  public picIndex: any;
  public damageLevel: any;
  public carSubpartId: string;
  public carSubpartName: string = "";
  public damageValue: any;
  public callback: any;
  public controller: any;
  public title: string;
  public damageIndex: number;

  public savePending: boolean = false;
  public carDamageLevels = [];
  public carSubparts = [];
  public selectedDamage:any;
  public srcorientation: any;

  constructor(
    public navCtrl: NavController,
    // public navParams: NavParams,
    private loadingServiceProvider: LoadingService,
    // private ng2ImgMax : Ng2ImgMaxService,
    // private camera: Camera,
    //  private ng2PicaService: Ng2PicaService,
    //  private imageCompress: NgxImageCompressService,
    // private carDamageLevelProvider: CarDamage,
    private carSubpartsProvider: CarSubpartsService,
    private alertServiceProvider: AlertService,
    // private storageService:StorageServiceProvider,
    public platform: Platform,
    private images: ImagesService,
    private alertCtrl: AlertController,
    private carDamageProvider:CarDamageService,
    private UserWebServices: UserinfoWebService,
    private router: Router
    //public camera: Camera
  ) {
    
    // platform.registerBackButtonAction(() => {
    //   this.back();
    // }, 2);

  }

  ionViewDidLoad() {
    // if(!this.base64Image || this.base64Image.length == 0){
    //   setTimeout( () => {
    //     this.takePicture();
    //   }, 500);
    // }

    this.getCurrentLocation();
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      function(position) {

        // ContextService.location = {
        //   'lat' : position.coords.latitude,
        //   'long' : position.coords.longitude
        // };

        ContextService.location["lat"] = position.coords.latitude;
        ContextService.location["long"] = position.coords.longitude;

      }, 
      function (error) { }
    );
  }

  ngOnInit() {
    this.strings = ConfigService.strings;

    this.getDamageLevels();
    this.getSubparts();

    // ContextService.SelectedCarDamage 
    this.picIndex = ContextService.SelectedCarDamage ? ContextService.SelectedCarDamage.picIndex : 0;  // this.navParams.get('picIndex');
    this.callback = ContextService.SelectedCarDamage ? ContextService.SelectedCarDamage.callback : null; // this.navParams.get('callback');
    this.controller = ContextService.SelectedCarDamage ? ContextService.SelectedCarDamage.controller : null; // this.navParams.get('controller');
    this.title = ContextService.SelectedCarDamage ? ContextService.SelectedCarDamage.title : 'title'; // this.navParams.get('title');
    this.damageIndex = ContextService.SelectedCarDamage ? ContextService.SelectedCarDamage.damageIndex : null; //. this.navParams.get('damageIndex');

    // console.log('ContextService.carParts: ', ContextService.carParts);
    if(!ContextService.carParts[this.picIndex]){
      ContextService.carParts[this.picIndex] = {};
    }

    if (ContextService.carParts[this.picIndex]['damages'] == null) {
      ContextService.carParts[this.picIndex]['damages'] = [];
    }

    // console.log('ContextService.carParts', ContextService.carParts);
    // console.log('this.damageIndex', this.damageIndex);

    if(this.damageIndex != null){
      this.selectedDamage = ContextService.carParts[this.picIndex]['damages'][this.damageIndex];
      
      console.log('this.selectedDamage:', this.selectedDamage);

      this.base64Image = this.selectedDamage['byteFoto'];
      this.carSubpartName = this.selectedDamage['pieza'];
      this.carSubpartId = this.selectedDamage['nivelDano'];
      this.damageValue = this.selectedDamage['valor'];


      let damage = this.carDamageLevels.filter(item => {
        return item['descDano'] === this.selectedDamage['nivelDano'];
      });

      console.log('damage:', damage);

      this.damageLevel = damage.length > 0 ? damage[0] : null;
    }
    else{
      this.carSubpartName =  this.strings.damageSelect;
    }

    console.log("this.carSubpartName: ", this.carSubpartName);
    console.log("this.damageValue: ", this.damageValue);

    // if(this.getUserType() === ''){
    //   this.damageValue = '0';
    // }
    
  }

  private getDamageLevels() {
    // this.loadingServiceProvider.showLoading();

    this.carDamageLevels = [
      {
        codDano : '1',
        descDano : 'Bajo'
      },
      {
        codDano : '2',
        descDano : 'Medio'
      },
      {
        codDano : '3',
        descDano : 'Alto'
      }
    ];

    // this.carDamageLevelProvider.getDamageLevels().subscribe(result => {
    //   if (result.status && result.data != null) {
    //     this.carDamageLevels = result.data.danos;

    //     if(this.damageIndex != null){
    //       let damage = this.carDamageLevels.filter(item => {
    //         return item['codDano'] === this.selectedDamage['dano']['codDano'];
    //       });

    //       this.damageLevel = damage.length > 0 ? damage[0] : null;
    //     }
    //   } 
    //   else {
    //     this.alertServiceProvider.show('Error', result.data);
    //   }

    //   this.loadingServiceProvider.hideLoading();
    // });

  }

  private getSubparts() {
    this.loadingServiceProvider.showLoading();

    this.carSubpartsProvider.getSubparts().subscribe(result => {
      if (result.status && result.data != null) {
        this.carSubparts = result.data;

        console.log("this.carSubparts", this.carSubparts);

      } else {
        this.alertServiceProvider.show('Error', result.data);
      }

      this.loadingServiceProvider.hideLoading();
    });
  }

  // public takePicture() {
  //   const options: CameraOptions = {
  //     quality: 80,
  //     destinationType: this.camera.DestinationType.DATA_URL,
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
  //     err => {}
  //   );
  // }

  //
  
  takePicture(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      var base64 = reader.result;
      // console.log("Base64 Original");
      // console.log(base64);
      compressImage(base64, file).then(compressed => {
        this.loadingServiceProvider.showLoading();
        var resizedBase64 = compressed as string;
        this.base64Image = resizedBase64.split(',')[1];
        this.savePending = true;
        // console.log("Base64 comprimido");
        // console.log(resizedBase64);
        // console.log("Base64 final");
        // console.log(this.base64Image);
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
            
            // console.log('Tamaño original: ' + img.width + 'x' + img.height);
            
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

          // console.log('Tamaño nuevo: ' + newWidth + 'x' + newHeight);
          
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
          // console.log("Orientacion de la imagen");
          // console.log(data);
          
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
  
  // public getImagePreview(file: File) {
  //   var reader: FileReader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     this.imgURI = reader.result;
  //     console.log(this.imgURI);
  //     this.base64Image = this.imgURI.split(',')[1];
  //     console.log(this.base64Image);
  //     this.savePending = true;
  //     this.loadingServiceProvider.hideLoading();
  //   };
  // }
  
  
  public capture(){
    document.getElementById("dan").click();
  }


  public openList(event:Event, controller:any, name:any, list:any, callback:any, loadAtStart:boolean){
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

    if(listName == 'subparts'){
      controller.carSubpartId = item.nombrePieza;
      controller.carSubpartName = item.nombrePieza;
    }

  }

  public back() {
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

  public setPicture() {


    if(!this.base64Image || !this.carSubpartId || !this.damageLevel || 
      (!this.damageValue && this.getUserType() === 'P' && !this.isCountry([ConstantsService.COSTARICA_CODE, ConstantsService.NICARAGUA_CODE, ConstantsService.HONDURAS_CODE]))){
      this.alertServiceProvider.show('', 'Debe ingresar todos los datos correctamente');
      return;
    }

    // if(!this.damageValue || this.damageValue.length == 0 || this.damageValue === undefined){
    //   this.damageValue == '0';
    // }

    // console.log("this.damageValue1: ", this.damageValue);


    if(!this.damageValue || this.damageValue === undefined || this.damageValue == ''){
      this.damageValue = '0';
    }

    // console.log("this.damageValue2: ", this.damageValue);

 

    // this.loadingServiceProvider.showLoading();

    // if(this.selectedDamage != null){
    //   this.selectedDamage['dano']['bytes'] = this.base64Image;
    //   this.selectedDamage['dano']['observaciones'] = this.damageLevel.descDano;
    //   this.selectedDamage['dano']['obsParte'] = this.carSubpartName;
    //   this.selectedDamage['dano']['codDano'] = String(this.damageLevel.codDano);
    //   this.selectedDamage['dano']['codSubParte'] = String(this.carSubpartId);
    //   this.selectedDamage['dano']['valorReparacion'] = String(this.damageValue);

    //   ContextService.carParts[this.picIndex]['damages'][this.damageIndex] = this.selectedDamage;
    // }
    // else{

      // ContextService.carParts[this.picIndex]['damages'][this.damageIndex] = {
        this.selectedDamage = {
          "numeroCotizacion": ContextService.currentInspection.numeroCotizacion,
          "pieza": this.carSubpartName,
          "nivelDano": this.damageLevel.descDano,
          "valor": String(this.damageValue),
          "byteFoto": this.base64Image,
          "pais":ContextService.location.country
        };

      // ContextService.carParts[this.picIndex]['damages'].push(
      //   {  
      //     'dano':{  
      //        'codCia':'1',
      //        'numInsp': ContextService.currentInspection.numInsp, 
      //        'numSecu':'1',
      //        'numRiesgo':'1',
      //        'codParte': String(this.picIndex),
      //        'codSubParte': String(this.carSubpartId),
      //        'codDano': String(this.damageLevel.codDano),
      //        'obsParte': this.carSubpartName,
      //        'valorReparacion': String(this.damageValue),
      //        'codReparacion':'0',
      //        'fecReparacion':'', 
      //        'codUsr':this.UserWebServices.username,
      //        'fecActu':dateFormat(new Date(), 'ddmmyyyy')
      //     },
      //     'foto':{  
      //       'codCia':'1',
      //       'numInsp': ContextService.currentInspection.numInsp,
      //       'numSecu':'1',
      //       'numRiesgo':'1',
      //       'tipoFoto':'DANO',
      //       'codigo': String(this.picIndex),
      //       'subCodigo': String(this.carSubpartId),
      //       'latitud': String(ContextService.location.lat),
      //       'longitud': String(ContextService.location.long),
      //       'observaciones':this.damageLevel.descDano,
      //       'bytes': this.base64Image,
      //       'codUsr':this.UserWebServices.username,
      //       'fecActu':dateFormat(new Date(), 'ddmmyyyy')
      //    }
      //  }
      // );
    // }

    // console.log('ContextService.carParts[this.picIndex]:', ContextService.carParts[this.picIndex]);

    this.syncPhotos();
    // this.storageService.saveCarParts();
    // this.savePending = false;
    
    // setTimeout( () => {
    //   this.loadingServiceProvider.hideLoading();
    //   this.callback(this.controller);
    //   this.back();
    // }, 500);

  }

  // Envio de Fotos al servicio
  public syncPhotos(){ 

    // var Foto = {  
    //   'codCia':'1',
    //   'numInsp': ContextService.currentInspection.numInsp,
    //   'numSecu':'1',
    //   'numRiesgo':'1',
    //   'tipoFoto':'DANO',
    //   'codigo': String(this.picIndex),
    //   'subCodigo': String(this.carSubpartId),
    //   'latitud': String(ContextService.location.lat),
    //   'longitud': String(ContextService.location.long),
    //   'observaciones':this.damageLevel.descDano,
    //   'bytes': this.base64Image,
    //   'codUsr': this.UserWebServices.username,
    //   'fecActu':dateFormat(new Date(), 'ddmmyyyy')
    // }

    // ContextService.carParts[this.picIndex]['damages'][this.damageIndex]
    this.uploadPhotos(this.selectedDamage);
  }

  public uploadPhotos(carPhoto: any) {

    console.log('uploadPhotos carPhoto', carPhoto);
    //console.log("Enviando Fotos")

    this.loadingServiceProvider.showLoading();

    this.images.sendCarDamages(carPhoto).subscribe(result => {
      //console.log(result);
      this.loadingServiceProvider.hideLoading();
      if (result.status) {

        if(this.damageIndex != null){
          ContextService.carParts[this.picIndex]['damages'][this.damageIndex] = carPhoto;
        }
        else{
          ContextService.carParts[this.picIndex]['damages'].push(carPhoto);
        }

        console.log('uploadPhotos ContextService.carParts[this.picIndex]:', ContextService.carParts[this.picIndex])

        // this.storageService.saveCarParts();
        this.savePending = false; 
        this.back();
      } else {
        // this.alertError();
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
  //           //console.log('Buy clicked');
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

  public getUserType(){
    return ContextService.userSession.userType;
  }

  public cleanField($event: any) {
    const searchRegExp = /[^0-9.,]/g;
    let oldValue = $event.target.value;
    // event.target.value = newValue.replace(searchRegExp, '');
    let newValue = oldValue.replace(searchRegExp, '');
    $event.target.value = newValue;

    setTimeout(function(){
      this.damageValue = newValue;
    }.bind(this), 50);
  }

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
    // return ContextService.location.country === ConstantsProvider.GUATEMALA_CODE;
  }


}
