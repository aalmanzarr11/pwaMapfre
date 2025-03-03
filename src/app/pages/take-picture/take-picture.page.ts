import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, Platform } from '@ionic/angular';
import imageCompression from 'browser-image-compression';
import { AlertService } from 'src/app/services/infrastructure/alert/alert.service';
import { ConfigService } from 'src/app/services/infrastructure/config/config.service';
import { ContextService } from 'src/app/services/infrastructure/context/context.service';
import { LoadingService } from 'src/app/services/infrastructure/loading/loading.service';
import { ImagesService } from 'src/app/services/remote/images/images.service';
import { UserinfoWebService } from 'src/app/services/remote/userinfo-web/userinfo-web.service';

@Component({
  selector: 'app-take-picture',
  templateUrl: './take-picture.page.html',
  styleUrls: ['./take-picture.page.scss'],
})
export class TakePicturePage implements OnInit {


  public savePending: boolean = false;
  public base64Image: any = ''; //ImagesService.image;
  public picIndex: any;
  public damages: any = [];
  public title: string;
  public currentImage: any;
  // private guideImages: any = [
  //   '',
  //   ''
  // ];

  public strings: any = {};

  constructor(private navCtrl: NavController,
              // public navParams: NavParams,
              //private ng2ImgMax : Ng2ImgMaxService,
              // private ng2PicaService: Ng2PicaService,
              // private imageCompress: NgxImageCompressService,
              private alertServiceProvider: AlertService,
              private loadingServiceProvider: LoadingService,
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


    this.picIndex = ContextService.SelectedCarPicture ? ContextService.SelectedCarPicture.picIndex : 1; // navParams.get('picIndex');
    this.title = ContextService.SelectedCarPicture ? ContextService.SelectedCarPicture.title : 'Title'; // navParams.get('title');

    console.log("ContextService.currentInspection", ContextService.currentInspection);


    if(ContextService.currentInspection){
      if (!ContextService.carParts[this.picIndex] || !ContextService.carParts[this.picIndex]['foto']) {

        // ContextService.carParts[this.picIndex]
        this.currentImage = {
          "numeroCotizacion": ContextService.currentInspection.numeroCotizacion,
          "tipoFoto": this.title.replace('<br />', ''),
          "byteFoto": "",
          "pais": ContextService.location.country
        };

        ContextService.carParts[this.picIndex] = {  
          // 'foto': {}
        };

        // ContextService.carParts[this.picIndex] = {  
        //   'foto':{  
        //     'codCia':'1',
        //     'numInsp': ContextService.currentInspection.numInsp,
        //     'numSecu':'1',
        //     'numRiesgo':'1',
        //     'tipoFoto':'PARTE',
        //     'codigo': String(this.picIndex),
        //     'subCodigo':'0',
        //     'latitud': String(ContextService.location.lat),
        //     'longitud': String(ContextService.location.long),
        //     'observaciones':this.title,
        //     'bytes':'',
        //     'codUsr':this.UserWebServices.username,
        //     'fecActu':dateFormat(new Date(), 'ddmmyyyy')
        //   }
        // };
      } 
      else {
        this.currentImage = ContextService.carParts[this.picIndex]['foto'];
        this.base64Image = this.currentImage['byteFoto'];
      }
    }

  }

  ngOnInit() {
    this.strings = ConfigService.strings;
  }

  ionViewDidLoad() {
    setTimeout( () => {
      // if (!ContextService.carParts[this.picIndex]['foto'] || 
      //     ContextService.carParts[this.picIndex]['foto']['bytes'] == '') {
      //   this.takePicture();
      // }
      
      this.updateDamages();
    }, 500);

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

  public updateDamages(){
    if(ContextService.carParts != null && 
      ContextService.carParts[this.picIndex] != null && 
      ContextService.carParts[this.picIndex]['damages'] != null){
      this.damages = ContextService.carParts[this.picIndex]['damages'];
    }
  }

  // public takePicture() {
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
      console.log("Base64 Original");
      console.log(base64);
      compressImage(base64, file).then(compressed => {
        this.loadingServiceProvider.showLoading();
        var resizedBase64 = compressed as string;
        this.base64Image = resizedBase64.split(',')[1];
        this.savePending = true;
        console.log("Base64 comprimido");
        console.log(resizedBase64);
        console.log("Base64 final");
        console.log(this.base64Image);
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

            console.log('Tamaño original: ' + img.width + 'x' + img.height);

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

        console.log('Tamaño nuevo: ' + newWidth + 'x' + newHeight);
        
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
        console.log("Orientacion de la imagen");
        console.log(data);
        
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
    
    
    /*this.loadingServiceProvider.showLoading();
    let image = event.target.files[0];
      //console.log(image);
      this.ng2PicaService.resize([image], 700, 500).subscribe(url =>{

        fileToBase64(url).then( img => {

          this.imageCompress.compressFile(img, 1, 50, 80).then(
            result => {
              this.base64Image = result.split(',')[1];
              this.savePending = true;
              //console.log(this.base64Image);
              this.loadingServiceProvider.hideLoading();
            }
          );
        });
      });*/
  
  // getImagePreview(file: File) {
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

  //
  public capture(){
    document.getElementById("cap").click();
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

    // console.log("ContextService.carParts", this.picIndex, ContextService.carParts);

    if(this.base64Image == '' || this.base64Image == null){
      // this.alertServiceProvider.show('', 'Debe tomar una foto');
      this.capture();
      return;
    }

    // this.loadingServiceProvider.showLoading();

    this.currentImage['byteFoto'] = this.base64Image;
    this.syncPhotos();
    // this.storageService.saveCarParts();
    // this.savePending = false;

    // setTimeout( () => {
    //   this.loadingServiceProvider.hideLoading();
    //   this.back();
    // }, 500);

    
  }

  // Envio de fotos al servicio

  public syncPhotos(){
    console.log("Sincronizando Fotos");
       
    this.uploadPhotos(this.currentImage);
    
    /* for (let carPhoto of ContextService.carParts) {
      if(carPhoto && carPhoto.foto && carPhoto.foto.bytes && carPhoto.foto.bytes.length > 0){
        
      }
    } */
  }

  public uploadPhotos(carPhoto: any) {
    //console.log(carPhoto);
    //console.log("Enviando Fotos")
    this.loadingServiceProvider.showLoading();

    this.images.uploadImage(carPhoto).subscribe(result => {
      this.loadingServiceProvider.hideLoading();
      if (result.status) {
        // this.storageService.saveCarParts();
        ContextService.carParts[this.picIndex]['foto'] = carPhoto;
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
  //           //console.log('Buy clicked');
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }



  public addDamage() {
    if (ContextService.carParts[this.picIndex]['damages'] == null ||
        ContextService.carParts[this.picIndex]['damages'].length < 4) {

      // this.navCtrl.push(
      //   CarDamagePage, 
      //   { picIndex: this.picIndex, callback: this.addDamageCallback, controller: this, title:this.title }
      // );

      ContextService.SelectedCarDamage = { picIndex: this.picIndex, callback: this.addDamageCallback, controller: this, title:this.title };
      return this.router.navigateByUrl('/car-damage');
    } 
    else {
      this.alertServiceProvider.show(
        '',
       this.strings.takePicMaxDamage
      );
    }
  }

  public addDamageCallback(controller){
    controller.updateDamages();
  }

  public checkDamage(index) {
    return (
      ContextService.carParts[this.picIndex] != null &&
      ContextService.carParts[this.picIndex]['damages'] != null &&
      ContextService.carParts[this.picIndex]['damages'][index] != null
    );
  }

  public getDamageImage(index) {
    this.damages = ContextService.carParts[this.picIndex]['damages'];
    if (this.damages[index] && this.damages[index]['byteFoto'] != '') {
      return 'data:image/jpeg;base64,' + this.damages[index]['byteFoto'];
    }
  }

  public getDamageLevel(index) {

// console.log(this.damages[index]);
// console.log(this.damages[index]['foto']);

    if (this.damages[index] && this.damages[index]) {
      return this.damages[index]['observaciones'];
    }
  }

  public removeDamage(index) {

    this.alertServiceProvider.confirm('', this.strings.takeDeleteDamageConfirm, 
      function(controller){
        ContextService.carParts[controller.picIndex]['damages'].splice(index, 1);
      }, 
      function(){

      }, this
    ); 
  }

  public openDamage(index) {

    // this.navCtrl.push(
    //   CarDamagePage, 
      // { 
      //   picIndex: this.picIndex, 
      //   callback: this.addDamageCallback, 
      //   controller: this, 
      //   title: this.title,
      //   damageIndex : index
      // }
    // );

    ContextService.SelectedCarDamage = { 
      picIndex: this.picIndex, 
      callback: this.addDamageCallback, 
      controller: this, 
      title: this.title,
      damageIndex : index
    };
    return this.router.navigateByUrl('/car-damage');
  }

  public isDisabled(){
    // return !ContextService.currentInspection.new && 
    //       ContextService.userSession.tipUsuario == '';

    return false;
  }

}
