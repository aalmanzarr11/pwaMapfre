import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { IonPullUpFooterState } from 'ionic-pullup';
import { AlertService } from 'src/app/services/infrastructure/alert/alert.service';
import { ConfigService } from 'src/app/services/infrastructure/config/config.service';
import { ContextService } from 'src/app/services/infrastructure/context/context.service';
import { InspectionService } from 'src/app/services/remote/inspection/inspection.service';
import { LoadingService } from 'src/app/services/infrastructure/loading/loading.service';
import { CarAccessoriesService } from 'src/app/services/remote/car-accessories/car-accessories.service';
import { CarDamageService } from 'src/app/services/remote/car-damage/car-damage.service';
import { ImagesService } from 'src/app/services/remote/images/images.service';

@Component({
  selector: 'app-inspection-list',
  templateUrl: './inspection-list.page.html',
  styleUrls: ['./inspection-list.page.scss'],
})
export class InspectionListPage implements OnInit {

  footerState: IonPullUpFooterState;
  inspections: any;
  strings: any = {};

  constructor(public navController: NavController,
              // public navParams: NavParams,
              private loadingServiceProvider: LoadingService,
              private carDamageProvider: CarDamageService,
              private carAccessoriesProvider: CarAccessoriesService,
              private imagesServiceProvider: ImagesService,
              private alertServiceProvider: AlertService,
              private inspectionProvider: InspectionService,
              private router: Router) {

    this.inspections = ContextService.inspectionList; 
    //navParams.get('inspections');
    console.log(this.inspections);
    // console.log(ContextService.accessories);
    // console.log(ContextService.currentInspection);
  }

  ngOnInit() {
    this.strings = ConfigService.strings;
  }

  ionViewDidLoad() {

    // if(this.inspections == null){
    //   this.loadInspectionsByInspector();
    // }

    // var hasInspections = ContextService.currentInspection != null &&
    //                      ContextService.currentInspection.inspeccion.numInsp != '';
    // this.inspections = hasInspections ? [ContextService.currentInspection] : [];

    console.log("ContextService.footerMenuOptions1:", ContextService.footerMenuOptions);
  }

  // public loadInspectionsByInspector(){

  //   // console.log(ContextService.userSession);

  //   // if(this.formGroup.valid){

  //     // TODO: load remote
  //     this.loadingServiceProvider.showLoading();

  //     this.inspectionProvider.loadInspections(
  //       null,
  //       null,
  //       null,
  //       ContextService.userSession.codInspector,
  //       null,
  //       null,
  //       null
  //     ).subscribe(result => {
  //         this.loadingServiceProvider.hideLoading();

  //         this.inspections = result.data;
  //       },
  //       error => {
  //         this.loadingServiceProvider.hideLoading();
  //         this.alertServiceProvider.show("Error", error);
  //       }
  //     );
  // }

  public selectInspection(inspection: any) {

    if (!inspection.new) {
      // ContextService.init();
      // inspection.new = false;
      // ContextService.currentInspection = inspection;
      // console.log('ContextService.currentInspection: ', ContextService.currentInspection);

      if(inspection.numeroCotizacion != null) {
        ContextService.currentInspection.numeroCotizacion = inspection.numeroCotizacion;
      }
      else if(inspection.poliza != null) {
        ContextService.currentInspection.numeroCotizacion = inspection.poliza;
      }

      this.loadInspectionDetails();



      // TODO: check local or remote
      // // TODO: remove this comment

      // ContextService.accessories = [];
      // ContextService.carParts = [];

      // this.getAccessories(inspection.inspeccion);
      // this.getDamages(inspection.inspeccion);
      // this.getPartImages(inspection.inspeccion);
    }

    // console.log(ContextService.carParts);




    // ContextService.footerMenuOptions[1]['status'] = 2;
    // this.navController.push(CustomerDataPage);
  }

  public loadInspectionDetails() {

    this.loadingServiceProvider.showLoading();

    this.inspectionProvider.loadInspectionDetails(
      ContextService.currentInspection.numeroCotizacion
    ).subscribe(result => {
          this.loadingServiceProvider.hideLoading();

          if(result.data.numDocumento !== null){
            ContextService.currentInspection = Object.assign(ContextService.currentInspection, result.data);
          }
          
          ContextService.carParts = [];
          ContextService.carDocuments = [];
          ContextService.carDamages = [];
          ContextService.accessories = [];

          return this.router.navigateByUrl('/customer-data');
        },
        error => {
          this.loadingServiceProvider.hideLoading();
          this.alertServiceProvider.show('Error', error);
        }
      );
  }

  // public loadInspectionDetails() {

  //   // console.log('ContextService.currentInspection.numeroCotizacion', ContextService.currentInspection['numeroCotizacion']);
  //   // console.log('ContextService.currentInspection.numeroCotizacion', ContextService.currentInspection.numeroCotizacion);

  //   this.loadingServiceProvider.showLoading();

  //   this.inspectionProvider.loadInspectionDetails(
  //     ContextService.currentInspection.numeroCotizacionx
  //   ).subscribe(result => {

  //         this.loadingServiceProvider.hideLoading();

  //         ContextService.currentInspection = Object.assign(ContextService.currentInspection, result.data);

  //         console.log('loadInspections result', result);
  //         console.log('ContextService.currentInspection', ContextService.currentInspection);

  //         // ContextService.footerMenuOptions[1]['status'] = 2;

  //         console.log("ContextService.footerMenuOptions:", ContextService.footerMenuOptions);

  //         this.navController.push(CustomerDataPage);

  //       },
  //       error => {
  //         this.loadingServiceProvider.hideLoading();
  //         this.alertServiceProvider.show('Error', error);
  //       }
  //     );

  // }


  private getAccessories(inspection: any) {

    this.loadingServiceProvider.showLoading();
    this.carAccessoriesProvider.getAccessories(inspection).subscribe(result => {

      console.log(result);

      if (result.status && result.data != null && result.data.accesorios) {

        for (const accesorio of result.data.accesorios) {
          ContextService.accessories.push({
            'accesorio': accesorio
          });
        }

        this.loadingServiceProvider.showLoading();
        this.imagesServiceProvider.getImages(inspection, 'ACCESORIO').subscribe(result => {

          console.log(result);

          if (result.status && result.data != null && result.data.fotos) {
            for (const accessory of ContextService.accessories) {

              // console.log(result.data.fotos);

              const image = result.data.fotos.filter(item => {

                console.log(item.codigo);
                console.log(item.subCodigo);
                console.log(accessory.accesorio.codTipAccesorio);
                console.log(accessory.accesorio.codAccesorio);

                // return String(item.codigo) === String(accessory.accesorio.codTipAccesorio) &&
                //         String(item.subCodigo) === String(accessory.accesorio.codAccesorio);

                return String(item.subCodigo) === String(accessory.accesorio.codAccesorio);
              });

              // console.log(image);

              if (image.length > 0) {
                accessory['foto'] = image[0];
              }

            }
          }

          this.loadingServiceProvider.hideLoading();
        });
      }

      this.loadingServiceProvider.hideLoading();
    });
  }

  private getDamages(inspection: any) {

    this.loadingServiceProvider.showLoading();
    this.carDamageProvider.getDamages(inspection).subscribe(result => {
      if (result.status && result.data != null && result.data.danos) {
        for (const dano of result.data.danos) {

          if (!ContextService.carParts[Number(dano.codParte)]) {
            ContextService.carParts[Number(dano.codParte)] = {};
          }

          if (!ContextService.carParts[Number(dano.codParte)]['damages']) {
            ContextService.carParts[Number(dano.codParte)] = {
              'damages' : []
            };
          }

          ContextService.carParts[Number(dano.codParte)]['damages'].push({
              'dano': dano
            }
          );
        }

        this.loadingServiceProvider.showLoading();
        this.imagesServiceProvider.getImages(inspection, 'DANO').subscribe(result => {
          if (result.status && result.data != null && result.data.fotos) {
            for (const carPart of ContextService.carParts) {
              if (carPart && carPart.damages) {
                for (const damage of carPart.damages) {
                  if (damage) {
                    const image = result.data.fotos.filter(item => {
                      return String(item.codigo) === String(damage.dano.codParte) &&
                             String(item.subCodigo) === String(damage.dano.codSubParte);
                    });

                    if (image.length > 0) {
                      damage['foto'] = image[0];
                    }
                  }
                }
              }
            }
          }

          this.loadingServiceProvider.hideLoading();
        });

      }

      this.loadingServiceProvider.hideLoading();
    });
  }

  private getPartImages(inspection: any) {

    this.loadingServiceProvider.showLoading();
    this.imagesServiceProvider.getImages(inspection, 'PARTE').subscribe(result => {

      if (result.status && result.data != null && result.data.fotos) {
        for (const image of result.data.fotos) {
          if (!ContextService.carParts[Number(image.codigo)]) {
            ContextService.carParts[Number(image.codigo)] = {};
          }

          ContextService.carParts[Number(image.codigo)]['foto'] = image;
        }
      }

      this.loadingServiceProvider.hideLoading();
    });

  }

}
