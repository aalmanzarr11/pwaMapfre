import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import imageCompression from 'browser-image-compression';
import { AlertService } from 'src/app/services/infrastructure/alert/alert.service';
import { ConfigService } from 'src/app/services/infrastructure/config/config.service';
import { ContextService } from 'src/app/services/infrastructure/context/context.service';
import { LoadingService } from 'src/app/services/infrastructure/loading/loading.service';
import { ImagesService } from 'src/app/services/remote/images/images.service';
import { UserinfoWebService } from 'src/app/services/remote/userinfo-web/userinfo-web.service';
import { DocumentationRequest } from 'src/app/shared/Dtos/Requests/DocumentationRequest.dto';

@Component({
  selector: 'app-car-take-legal-pictures',
  templateUrl: './car-take-legal-pictures.page.html',
  styleUrls: ['./car-take-legal-pictures.page.scss'],
})
export class CarTakeLegalPicturesPage implements OnInit {

  public strings: any = {};
  // private imgURI: any;
  // private imgbase: any;

  public savePending = false;
  public base64Image: any = ''; //ImagesServiceProvider.image;
  public picIndex: any;
  public title: string;
  public currentDocument: DocumentationRequest;

  constructor(public navCtrl: NavController,
              // public navParams: NavParams,
              private alertServiceProvider: AlertService,
              // private imageCompress: NgxImageCompressService,
              // private ng2ImgMax: Ng2ImgMaxService,
              // private ng2PicaService: Ng2PicaService,
              private loadingServiceProvider: LoadingService,
              // private storageService: StorageServiceProvider,
              public platform: Platform,
              // public camera: Camera,
              private images: ImagesService,
              private alertCtrl: AlertController,
              private UserWebServices: UserinfoWebService) {

    // platform.registerBackButtonAction(() => {
    //   this.back();
    // }, 2);

    // ContextService.SelectedCarPicture

    this.picIndex = ContextService.SelectedCarPicture ? ContextService.SelectedCarPicture.picIndex : 0; // navParams.get('picIndex');
    this.title = ContextService.SelectedCarPicture ? ContextService.SelectedCarPicture.title : 'Title'; // navParams.get('title');

    this.currentDocument = new DocumentationRequest(
      ContextService.userSession.nomUsuario ? ContextService.userSession.nomUsuario : 'cliente',
       ContextService.currentInspection.numeroCotizacion,
       this.title.replace('<br />', ''),
       "")
    

    if (ContextService.carDocuments[this.picIndex] == null) {

      // ContextService.carDocuments[this.picIndex] = {
      //   "numeroCotizacion": ContextService.currentInspection.numeroCotizacion,
      //   "pieza": this.title,
      //   "nivelDano": "",
      //   "valor": "",
      //   "byteFoto": "",
      //   "pais": ContextService.location.country
      // };

      // ContextService.carDocuments[this.picIndex] = {
      //   "usuario": ContextService.userSession.nomUsuario,
      //   "numeroCotizacion": ContextService.currentInspection.numeroCotizacion,
      //   "tipoDocumento": this.title.replace('<br />', ''),
      //   "byteFoto": "",
      //   "pais": ContextService.location.country
      // }

      // //console.log('ContextService.userSession.nomUsuario', ContextService.userSession.nomUsuario);

      // this.currentDocument = {
      //   "usuario": ContextService.userSession.nomUsuario ? ContextService.userSession.nomUsuario : 'cliente',
      //   "numeroCotizacion": ContextService.currentInspection.numeroCotizacion,
      //   "tipoDocumento": this.title.replace('<br />', ''),
      //   "byteFoto": "",
      //   "pais": ContextService.location.country
      // };
      

    //   ContextService.carDocuments[this.picIndex] = {
    //     'foto': {
    //        'codCia': '1',
    //        'numInsp': ContextService.currentInspection.numInsp,
    //        'numSecu': '1',
    //        'numRiesgo': '1',
    //        'tipoFoto': 'PARTE',
    //        'codigo': String(this.picIndex),
    //        'subCodigo': '0',
    //        'latitud': String(ContextService.location.lat),
    //        'longitud': String(ContextService.location.long),
    //        'observaciones': this.title,
    //        'bytes': '',
    //        'codUsr': this.UserWebServices.username,
    //        'fecActu': dateFormat(new Date(), 'ddmmyyyy')
    //     }
    //  }; 
    } 
    else {
      this.base64Image = ContextService.carDocuments[this.picIndex]['byteFoto'];
      this.currentDocument["byteFoto"] = this.base64Image;
    }

  }

  ngOnInit() {
    this.strings = ConfigService.strings;
  }

  ionViewDidLoad() {
    // setTimeout( () => {
    //   if (ContextService.carParts[this.picIndex]['foto']['bytes'] == '') {
    //     this.capture();
    //   }
    // }, 500);
 
  }
 

  public checkLegalImage(index) {
    return ContextService.carDocuments != null &&
           ContextService.carDocuments[index] != null &&
           ContextService.carDocuments[index]['foto']['bytes'] != '';
  }

  //
  takePicture(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result; 
      compressImage(base64, file).then(compressed => {
        this.loadingServiceProvider.showLoading();
        const resizedBase64 = compressed as string;
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

            //console.log('Tamaño original: ' + img.width + 'x' + img.height);

            // nuevo tamaño
            let newWidth;
            let newHeight;

              if (img.width < 1500 || img.height < 1500) {
                newWidth = img.width;
                newHeight = img.height;
              } else if (img.width < 4000 || img.height < 4000) {
                newWidth = img.width * 0.50;
                newHeight = img.height * 0.50;
              } else if (img.width > 4000 || img.height > 4000) {
                newWidth = img.width * 0.15;
                newHeight = img.height * 0.15;
              }

            //console.log('Tamaño nuevo: ' + newWidth + 'x' + newHeight);

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
            //console.log('Orientacion de la imagen');
            //console.log(data);

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

            // ctx.drawImage(img, 0, 0, newW, newH);
            const b64 = ctx.canvas.toDataURL('image/jpeg', 0.4);
            res(b64);
          });
        }
        img.onerror = error => rej(error);
      })
    }
  }

    // //console.log(blob);
  //   var image = new Image();
  //   image.src = URL.createObjectURL(file);
  //   this.loadingServiceProvider.showLoading();
  //   //console.log(image);
  //   var imagebase64 = imageToDataUri(image, 800, 800);
  //   //Se procesa la imagen de image URL a canvas y por ultimo base64
  //   function imageToDataUri(image, width, height) {

  //     // create an off-screen canvas
  //     var canvas = document.createElement('canvas'),
  //     ctx = canvas.getContext('2d');

  //     // draw source image into the off-screen canvas:
  //     ctx.drawImage(image, 0, 0, width, height);

  //     // encode image to data-uri with base64 version of compressed image
  //     var b64 = canvas.toDataURL();
  //     //console.log(b64);
  //     return canvas.toDataURL();
  // }

  // //console.log(imagebase64);
    //
    // //console.log("convertir a base64 3 metodo");
    // this.base64Image = capture.split(',')[1];
    // //console.log(this.base64Image);


      // Convirtiendo a base64
      // let reader = new FileReader();
      // reader.readAsDataURL(blob);
      // reader.onload = () => {
      //  var resultDATA = reader.result;
      //  //console.log("Resultado de Base64");
      //  //console.log(resultDATA);
      // }



    /*this.loadingServiceProvider.showLoading();
    let image = event.target.files[0];
      ////console.log(image);
      this.ng2PicaService.resize([image], 700, 500).subscribe(url =>{

        fileToBase64(url).then( img => {

          this.imageCompress.compressFile(img, 1, 50, 80).then(
            result => {
              this.base64Image = result.split(',')[1];
              this.savePending = true;
              ////console.log(this.base64Image);
              this.loadingServiceProvider.hideLoading();
            }
          );
        });
      });*/


  // getImagePreview(result) {
  //   var reader: FileReader = new FileReader();
  //   reader.readAsDataURL(result);
  //   reader.onload = () => {
  //     this.imgURI = reader.result;
  //     ////console.log(this.imgURI);
  //     this.imgbase = this.imgURI.split(',')[1];
  //     //console.log(this.imgbase);
  //     //this.savePending = true;
  //     //this.loadingServiceProvider.hideLoading();
  //   };
  // }

  public capture() {
    document.getElementById('cap').click();
  }


  /*public CapPicture(image) {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: image,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation : true,
      targetWidth : 800,
      targetHeight : 800
    };

    this.camera.getPicture().then(
      imageData => {
        this.base64Image = imageData;
        this.savePending = true;
      },
      err => {
        // Handle error
      }
    );
  }*/


  public setPicture() {

    //console.log("ContextService.carDocuments legal", this.picIndex, ContextService.carDocuments);

    if (this.base64Image === '' || this.base64Image == null) {
      this.alertServiceProvider.show('', this.strings.generalTakePicError);
      return;
    }

    // this.loadingServiceProvider.showLoading();

    // ContextService.carDocuments[this.picIndex]['byteFoto'] = this.base64Image;
    this.currentDocument['byteFoto'] = this.base64Image;
    this.syncPhotos();
    // this.storageService.saveCarParts();
    // this.savePending = false;

    // setTimeout( () => {
    //   this.loadingServiceProvider.hideLoading();
    //   this.back();
    // }, 500);
  }

  public syncPhotos() {
    //console.log('Sincronizando Fotos'); 

    // this.uploadPhotos(ContextService.carDocuments[this.picIndex]);
    this.uploadPhotos(this.currentDocument);


    /* for (let carPhoto of ContextService.carParts) {
      if(carPhoto && carPhoto.foto && carPhoto.foto.bytes && carPhoto.foto.bytes.length > 0){

      }
    } */
  }

  public uploadPhotos(carPhoto: DocumentationRequest) {
    // //console.log('carPhoto', carPhoto);
    // //console.log("Enviando Fotos")

    this.loadingServiceProvider.showLoading();

    this.images.sendCarDocuments(carPhoto).subscribe(result => {
      this.loadingServiceProvider.hideLoading();

      // //console.log('sendCarDocuments result', result);

      if (result.status) {
        // this.storageService.saveCarParts();
        ContextService.carDocuments[this.picIndex] = carPhoto;
        this.savePending = false;
        this.back();
      } else {
        // this.alertError();
        this.alertServiceProvider.show('Información', 'No fue posible enviar la foto. Intente nuevamente');
      }
    });
  }

  // alertError() {
  //   const alert = this.alertCtrl.create({
  //     title: 'Información',
  //     message: 'No fue posible enviar la foto. Intente nuevamente',
  //     buttons: [
  //       {
  //         text: 'Aceptar',
  //         handler: () => {
  //           // this.loadingServiceProvider.hideLoading();
  //           // //console.log('Buy clicked');
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }


  public back() {
    if (this.savePending) {

      this.alertServiceProvider.confirm('', this.strings.discardPictureConfirm,
        function(controller) {
          controller.navCtrl.pop();
        },
        function() {

        }, this
      );

    } else {
      this.navCtrl.pop();
    }
  }

  public isDisabled() {
    // return ContextService.userSession && !ContextService.currentInspection.new &&
    //       ContextService.userSession.tipUsuario == '';
    return false;
  }

}
