// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(
    // public http: HttpClient, 
    private alertController: AlertController) {
  }

  async show(title, text) {

    const alert = await this.alertController.create({
      header: title,
      cssClass: 'loading-custom-class',
      // subHeader: 'text',
      message: text,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async confirm(title, text, confirmCallback, cancelCallback, controller){
    const alert = await this.alertController.create({
      header: title,
      message: text,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // //console.log('Cancel clicked');
            cancelCallback();
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            // //console.log('Buy clicked');
            confirmCallback(controller);
          }
        }
      ]
    });

    await alert.present();
  }
}
