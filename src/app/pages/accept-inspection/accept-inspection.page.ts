import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/infrastructure/alert/alert.service';
import { ConfigService } from 'src/app/services/infrastructure/config/config.service';
import { ConstantsService } from 'src/app/services/infrastructure/constants/constants.service';
import { ContextService } from 'src/app/services/infrastructure/context/context.service';
import { InspectionService } from 'src/app/services/remote/inspection/inspection.service';
import { LoadingService } from 'src/app/services/infrastructure/loading/loading.service';
import { CarAccessoriesService } from 'src/app/services/remote/car-accessories/car-accessories.service';
import { CarDamageService } from 'src/app/services/remote/car-damage/car-damage.service';
import { ImagesService } from 'src/app/services/remote/images/images.service';
import { InspectionStatusService } from 'src/app/services/remote/inspection-status/inspection-status.service';
import { sendResponseRequest } from 'src/app/shared/Dtos/Requests/sendResponseRequest.dto';

@Component({
  selector: 'app-accept-inspection',
  templateUrl: './accept-inspection.page.html',
  styleUrls: ['./accept-inspection.page.scss'],
})
export class AcceptInspectionPage implements OnInit {


  strings: any = {};
  formGroup:UntypedFormGroup;
  currentInspection: any = {};
  statusList = [];
  
  constructor(public navCtrl: NavController,
              private loadingServiceProvider: LoadingService,
              private alertServiceProvider: AlertService,
              private inspectionProvider:InspectionService,
              private carDamageProvider:CarDamageService,
              private carAccessoriesProvider:CarAccessoriesService,
              private imagesServiceProvider:ImagesService,
              private statusServiceProvider: InspectionStatusService,
              private router: Router) {
  }

  ngOnInit() {
    this.formGroup = new UntypedFormGroup({
      inspectionStatus: new UntypedFormControl('', [Validators.required]),
      inspectionNotes: new UntypedFormControl('', [Validators.required])
    }); 

    this.getStatusList();

    this.currentInspection = ContextService.currentInspection;
    this.strings = ConfigService.strings; 
  }
 

  private getStatusList() {

    this.statusList = [
      {
        'tipSituInsp' : '1',
        'nomSituInsp' : 'INSPECCION AUTORIZADA'
      },
      {
        'tipSituInsp' : '0',
        'nomSituInsp' : 'INSPECCION RECHAZADA'
      } 
    ];

    // this.loadingServiceProvider.showLoading();

    // this.statusServiceProvider.getStatusList().subscribe(result => {
    //   if (result.status && result.data != null) {
    //     this.statusList = result.data.tipSitusInsp;
    //   } else {
    //     this.alertServiceProvider.show('Error', result.data);
    //   }

    //   this.loadingServiceProvider.hideLoading();
    // });
  }

  public getInspectionNum(){
    return ContextService.currentInspection != null && ContextService.currentInspection.numeroCotizacion ?
    ContextService.currentInspection.numeroCotizacion :
    '';
  }

  public next(){
 

    var validForm = true;

    if(this.getUserType() === 'P' && (!this.currentInspection.tipSituInsp || !this.currentInspection.notes)) {
      validForm = false;
    }
    else if(!this.currentInspection.notes) {
      validForm = false;
    }

    if(!validForm){
      this.alertServiceProvider.show('', 'Debe ingresar todos los datos correctamente');
      return;
    }


    // currentInspection.tipSituInsp
    // currentInspection.notes

    // // if(!this.base64Image || !this.carSubpartId || !this.damageLevel || (!this.damageValue && this.getUserType() === 'P')){
    // if(!this.base64Image || !this.carSubpartId || !this.damageLevel || (!this.damageValue && this.getUserType() === 'P')){
    //   this.alertServiceProvider.show('', 'Debe ingresar todos los datos correctamente');
    //   return;
    // }

    this.uploadInspection();
    // this.navCtrl.push(CarInspectionSuccessPage); 
  }

  public uploadInspection(){
    this.loadingServiceProvider.showLoading();

    var request = new sendResponseRequest(
      ContextService.userSession.nomUsuario ? ContextService.userSession.nomUsuario : 'cliente',
      this.currentInspection.numeroCotizacion,
      this.currentInspection.nomSituInsp ? this.currentInspection.nomSituInsp : 'Pendiente',
      this.currentInspection.notes,
      []
    ) 
    const body:sendResponseRequest[]=[request]

    this.inspectionProvider.uploadInspection(body).subscribe(result => {

      this.loadingServiceProvider.hideLoading();

      if (result && result.status) {
 
        return this.router.navigateByUrl('/car-inspection-success'); 
      } 
      else {
        this.alertServiceProvider.show("Error", result.data);
      } 

    });
  }

  public uploadDamages(){
    for (let carPart of ContextService.carParts) {
      if(carPart && carPart.damages){
        for (let damage of carPart.damages) {
          if(damage){

            this.loadingServiceProvider.showLoading();
        
            this.carDamageProvider.uploadDamage(damage.dano).subscribe(result => {
              if (result && result.status) {
        
              } 
              else {
                // this.alertServiceProvider.show("Error", result.data);
              }
        
              this.loadingServiceProvider.hideLoading();
        
            });
          }
        }
      }
    }
  }

  public uploadAccessories(){
    for (let accessory of ContextService.accessories) {
      if(accessory){
        this.loadingServiceProvider.showLoading();
    
        this.carAccessoriesProvider.uploadAccessory(accessory).subscribe(result => {
    
          // //console.log(result);

          if (result && result.status) {
    
          } 
          else {
            // this.alertServiceProvider.show("Error", result.data);
          }
    
          this.loadingServiceProvider.hideLoading();
    
        });

      }
    }
  }

  public syncPhotos(){
    for (let carPhoto of ContextService.carParts) {
      if(carPhoto && carPhoto.foto && carPhoto.foto.bytes && carPhoto.foto.bytes.length > 0){
        this.uploadPhotos(carPhoto.foto);
      }
    }

    for (let carPart of ContextService.carParts) {
      if(carPart && carPart.damages){
        for (let damage of carPart.damages) {
          if(damage && damage.foto && damage.foto.bytes && damage.foto.bytes.length > 0){
            this.uploadPhotos(damage.foto);
          }
        }
      }
    }

    for (let accessory of ContextService.accessories) {
      //console.log("todo") 
     /* if(accessory && accessory.byteFoto && accessory.foto.bytes && accessory.foto.bytes.length > 0){
        this.uploadPhotos(accessory.foto);
      }*/
    }
  }

  public uploadPhotos(carPhoto:any){
    this.loadingServiceProvider.showLoading();

    this.imagesServiceProvider.uploadImage(carPhoto).subscribe(result => {

      // //console.log(result);

      if (result && result.status) {

      } 
      else {
        // this.alertServiceProvider.show("Error", result.data);
      }

      this.loadingServiceProvider.hideLoading();

    });
  }

  public uploadInspectionCallback(controller:any){
    // controller.navCtrl.push(CarInspectionSuccessPage); 
    return this.router.navigateByUrl('/car-inspection-success');
  }

  public getUserType(){
    return ContextService.userSession.userType;
  }
 

}
