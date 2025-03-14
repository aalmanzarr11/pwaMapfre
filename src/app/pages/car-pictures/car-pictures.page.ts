import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { IonPullUpFooterState } from 'ionic-pullup';
import { AlertService } from 'src/app/services/infrastructure/alert/alert.service';
import { ConfigService } from 'src/app/services/infrastructure/config/config.service';
import { ContextService } from 'src/app/services/infrastructure/context/context.service';
import { EnvironmentService } from 'src/app/services/infrastructure/environment/environment.service';
import { HelperStringsService } from 'src/app/services/infrastructure/helper-strings/helper-strings.service';
import { LoadingService } from 'src/app/services/infrastructure/loading/loading.service';
import { LogInfoService } from 'src/app/services/infrastructure/log-info/log-info.service';
import { CarPartsService } from 'src/app/services/remote/car-parts/car-parts.service';
import { ImagesService } from 'src/app/services/remote/images/images.service';
import { DamageRequest } from 'src/app/shared/Dtos/Requests/DamageRequest.dto';
import { VehiclePhotoRequest } from 'src/app/shared/Dtos/Requests/vehiclePhotoRequest.dto';

@Component({
  selector: 'app-car-pictures',
  templateUrl: './car-pictures.page.html',
  styleUrls: ['./car-pictures.page.scss'],
})
export class CarPicturesPage implements OnInit {

// currentCarParts = [];
carParts = [];
carUses = [];

footerState: IonPullUpFooterState;
currentPage = 4; 
footerMenuOptions = [];
strings: any = {};
currentInspection: any = {};
buttonEnabled: boolean = false;

carImages: VehiclePhotoRequest[] = [];
carDamages: DamageRequest[] = [];

constructor(public navCtrl: NavController, 
            // public navParams: NavParams, 
            // public camera: Camera,
            private loadingServiceProvider: LoadingService,
            private alertServiceProvider: AlertService,
            private carPartsProvider:CarPartsService,
            private logInfoClient:LogInfoService,
            // private emarketInit: InitEMarket,
            private alertCtrl: AlertController,
            private helperStrings: HelperStringsService,
            private imagesServiceProviderRemote: ImagesService,
            private router: Router) {
              
  this.footerState = IonPullUpFooterState.Collapsed;

  if(ContextService.footerMenuOptions != null && ContextService.footerMenuOptions[this.currentPage - 1]){
    ContextService.footerMenuOptions[this.currentPage - 1]['status'] = 1;
    this.footerMenuOptions = ContextService.footerMenuOptions;
  }

  if(ContextService.carParts == null){
    ContextService.carParts = [];
  }

  this.currentInspection = ContextService.currentInspection;

  // //console.log(ContextService.carParts);

  this.getCarParts();
}

ngOnInit() {
  this.strings = ConfigService.strings;
  // if (this.emarketInit.Enabled) {
    this.buttonEnabled = true;
  // }
 
}

ionViewDidEnter() {
  // this.getCarParts();
}

getCarParts() {
    this.carParts = [
      {
        'codParte': '1',
        'descParte': 'Placa del vehículo Frontal'
      },
      {
        'codParte': '2',
        'descParte': 'Diagonal izquierda desde el frente del vehículo'
      },
      {
        'codParte': '3', 
        'descParte': 'Diagonal derecha desde el frente del vehículo'
      },
      {
        'codParte': '4',
        'descParte': 'Motor'
      },
      {
        'codParte': '5',
        'descParte': 'Lateral izquierdo del vehículo'
      },
      {
        'codParte': '6',
        'descParte': 'Lateral derecho del vehículo'
      },
      {
        'codParte': '7',
        'descParte': 'Diagonal izquierda desde la parte posterior del vehículo'
      },
      {
        'codParte': '8',
        'descParte': 'Diagonal derecha desde la parte posterior del vehículo'
      },
      {
        'codParte': '9',
        'descParte': 'Placa del vehículo Trasera'
      },
      {
        'codParte': '10',
        'descParte': 'Baúl (destacando tipo y existencia de llanta de repuesto)'
      },
      {
        'codParte': '11',
        'descParte': 'Techo (exterior vehículo)'
      },
      {
        'codParte': '12',
        'descParte': 'Tablero mostrando kilometraje (tomar fotografía con el vehículo encendido)'
      }


    ];
}

private getCarPartsAsync() {
  this.loadingServiceProvider.showLoading();

  this.carPartsProvider.getParts().subscribe(result => {
    if (result.status && result.data != null) {
      this.carParts = result.data.partes;
    } else {
      this.alertServiceProvider.show('Error', result.data);
    }

    this.loadingServiceProvider.hideLoading();
  });


}

public isImageTaken(index){

  return ContextService.carParts != null && 
         ContextService.carParts[index] != null && 
         ContextService.carParts[index]['foto'] &&
         ContextService.carParts[index]['foto']['byteFoto'] != '';

  // return ContextService.carParts != null && 
  //   ContextService.carParts[index] != null && 
  //   ContextService.carParts[index]['byteFoto'] != '';


}

public hasDamages(index){

  // return false;

  return (
    ContextService.carParts[index] != null &&
    ContextService.carParts[index]['damages'] != null &&
    ContextService.carParts[index]['damages'].length > 0
  );
}

public takePicture(index){

  //console.log(index);

  let part = this.carParts.filter(item => {
    return item['codParte'] === String(index);
  });

  //console.log(part);

  if(part.length > 0){

    ContextService.SelectedCarPicture = {picIndex : index, title : part[0].descParte.toLowerCase()};
    return this.router.navigateByUrl('/take-picture');

    // this.navCtrl.push(TakePicturePage, {picIndex : index, title : part[0].descParte.toLowerCase()});
    // this.navCtrl.push(TakePictureGuidePage, {picIndex : index, title : part[0].descParte.toLowerCase()});
  }
}

public back(){
  this.navCtrl.pop();
}

public exit(){
  // this.alertExit("¿Estas seguro que deseas salir de la autoinspeccion y regresar al E-Market?");
}

public next(){

  this.carImages = [];
  this.carDamages = [];

  for(let i = 1; i < 13; i++) {

    // 

    // if(!this.isImageTaken(i) && this.strings['carPicsPart_Mandatory_' + i] == '1'){
    if(!this.isImageTaken(i) && this.strings['carPicsPart_Mandatory_' + i] == '1' && EnvironmentService.isProduction){
      
      let part = this.carParts.filter(item => {
        return item['codParte'] === String(i);
      });
  
      this.alertServiceProvider.show('', this.strings.carPicsError + part[0].descParte.toLowerCase());
      return;
    }

    if(this.isImageTaken(i)){

      //console.log('ContextService.carParts', i, ContextService.carParts[i]);

      // let carPart = ContextService.carParts[i];

      // this.carImages.push(
      //   {
      //     "numeroCotizacion": this.currentInspection.numeroCotizacion,
      //     "tipoFoto" : carPart['foto']['observaciones'],
      //     "byteFoto": carPart['foto']['bytes'],
      //     "pais": ContextService.location.country // this.strings.countryName //
      //   }
      // );


      if(ContextService.carParts[i]['damages'] != null && ContextService.carParts[i]['damages'].length > 0){

        for(let j = 0; j < ContextService.carParts[i]['damages'].length; j++){
          //console.log('ContextService.carParts.damages', j, ContextService.carParts[i]['damages'][j]);
        
          let carDamage = ContextService.carParts[i]['damages'][j];

          // this.carDamages.push(
          //   {
          //     "numeroCotizacion": this.currentInspection.numeroCotizacion,
          //     "pieza" : carDamage['dano']['codSubParte'],
          //     "nivelDano": carDamage['foto']['observaciones'],
          //     "valor": carDamage['dano']['valorReparacion'],
          //     "byteFoto": carDamage['foto']['bytes'],
          //     "pais": ContextService.location.country // this.strings.countryName //
          //   }
          // );
        
        }

        // // DAÑO
        // {
        //   "numeroCotizacion":"123456",
        //   "pieza":"Amortiguador delantero",
        //   "nivelDano": "Leve",
        //   "valor":"100.00",
        //   "byteFoto":"12596371428630",
        //   "pais":"PANAMA"
        // }
      }

    }
  } 

  // this.sendCarImages();
  this.goToCarAccessories();


}

sendCarImages() {

  if(this.carImages.length > 0) {
    ////console.log(carPhoto);
    ////console.log("Enviando Fotos")
    this.loadingServiceProvider.showLoading();

    this.imagesServiceProviderRemote.sendCarImages(this.carImages).subscribe(result => {

      //console.log('sendCarImages', result);

      this.loadingServiceProvider.hideLoading();

      if (result.status) {
        this.sendCarDamages();
        // this.storageService.saveCarParts();
        // this.savePending = false; 
        // this.back();
      } else {
        this.alertServiceProvider.show('Información', 'No fue posible enviar las fotografías. Intente nuevamente');
      }

    });
  }
  else{
    this.goToCarAccessories();
  }

}

sendCarDamages() {

  if(this.carDamages.length > 0) {
    ////console.log(carPhoto);
    ////console.log("Enviando Fotos")
    this.loadingServiceProvider.showLoading();

    this.imagesServiceProviderRemote.sendCarDamages(this.carDamages).subscribe(result => {

      //console.log('sendCarDamages', result);

      this.loadingServiceProvider.hideLoading();

      if (result.status) {
        this.goToCarAccessories()
      } else {
        this.alertServiceProvider.show('Información', 'No fue posible enviar las fotografías. Intente nuevamente');
      }

    });
  }
  else{
    this.goToCarAccessories();
  }


}

goToCarAccessories() {
  ContextService.footerMenuOptions[this.currentPage - 1]['status'] = 2;
  // this.navCtrl.push(CarAccessoriesPage);
  return this.router.navigateByUrl('/car-accessories');
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

ionViewDidLoad() {
  // //console.log('ionViewDidLoad CarPicturesPage');
}

// alertExit(msg:string) {
//   let alert = this.alertCtrl.create({
//     title: 'Información',
//     message: msg,
//     buttons: [
//       {
//         text: 'Aceptar',
//         handler: () => {
//           //console.log('Acepted clicked');
//           window.location.replace(this.helperStrings.ReturnURL);
//         }
//       },
//       {
//         text: 'Rechazar',
//         role: 'cancel',
//         handler: () => {
//           //console.log('Cancel clicked');
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
//           ////console.log('Buy clicked');
//         }
//       }
//     ]
//   });
//   alert.present();
// }

}
