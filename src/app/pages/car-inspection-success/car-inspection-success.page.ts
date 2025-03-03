import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ConfigService } from 'src/app/services/infrastructure/config/config.service';
import { ContextService } from 'src/app/services/infrastructure/context/context.service';
import { HelperStringsService } from 'src/app/services/infrastructure/helper-strings/helper-strings.service';

@Component({
  selector: 'app-car-inspection-success',
  templateUrl: './car-inspection-success.page.html',
  styleUrls: ['./car-inspection-success.page.scss'],
})
export class CarInspectionSuccessPage implements OnInit {


  currentInspection: any = {};
  strings: any = {};
  buttonEnabled: boolean = false;

  constructor(
    public navCtrl: NavController, 
    // public navParams: NavParams, 
    // private emarketInit: InitEMarket, 
    private alertCtrl: AlertController,
    private helperStrings : HelperStringsService
    ) {

  }

  ngOnInit() {

    this.strings = ConfigService.strings;

    // if (this.emarketInit.Enabled) {
    //   this.buttonEnabled = true;
    // }

    if(ContextService.currentInspection != null && 
        ContextService.currentInspection.inspeccion){
      
      // numInsp
      this.currentInspection = ContextService.currentInspection.inspeccion;
    }

    console.log('this.currentInspection', this.currentInspection);
    console.log('ContextService.currentInspection', ContextService.currentInspection);
    console.log('ContextService.userSession', ContextService.userSession);
  }

  ionViewDidLoad() {
  }

  public next() {
    this.navCtrl.navigateRoot('/enter-car');
  }

  // public exit(){
  //   this.alertExit("¿Estas seguro que deseas salir de la autoinspeccion y regresar al E-Market?");
  // }

  public back() {
    this.navCtrl.pop();
  }

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

  public getUserType(){
    return ContextService.userSession.userType;
  }

  public getInspectionStatus(){
    return ContextService.currentInspection != null && ContextService.currentInspection.tipSituInsp ?
    ContextService.currentInspection.tipSituInsp :
    '';
  }

  public getInspectionNum(){
    return ContextService.currentInspection != null && ContextService.currentInspection.numeroCotizacion ?
    ContextService.currentInspection.numeroCotizacion :
    '';
  }

}
