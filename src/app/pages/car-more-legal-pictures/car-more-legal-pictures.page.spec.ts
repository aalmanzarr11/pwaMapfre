import { TestBed } from '@angular/core/testing';
import { CarMoreLegalPicturesPage } from './car-more-legal-pictures.page';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/infrastructure/alert/alert.service';
import { ConfigService } from 'src/app/services/infrastructure/config/config.service';
import { ContextService } from 'src/app/services/infrastructure/context/context.service';
import { LoadingService } from 'src/app/services/infrastructure/loading/loading.service';
import { LogInfoService } from 'src/app/services/infrastructure/log-info/log-info.service';
import { CarPartsService } from 'src/app/services/remote/car-parts/car-parts.service';

describe('CarMoreLegalPicturesPage', () => {
  let component: CarMoreLegalPicturesPage;
  let navCtrlSpy: any;
  let routerSpy: any;
  let loadingServiceSpy: any;
  let alertServiceSpy: any;
  let carPartsServiceSpy: any
  let logInfoServiceSpy: any;;

  beforeEach(() => {
    navCtrlSpy = jasmine.createSpyObj('NavController', ['pop']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['showLoading', 'hideLoading']);
    alertServiceSpy = jasmine.createSpyObj('AlertService', ['show']);
    carPartsServiceSpy = jasmine.createSpyObj('CarPartsService', ['getParts']);
    logInfoServiceSpy = jasmine.createSpyObj('LogInfoService', ['createLogInfo']);
    ContextService.footerMenuOptions = [
      {title : 'Ingreso placa vehículo', status : 0},
      {title : 'Datos de cliente y vehículo', status : 0},
      {title : 'Inspección matrícula', status : 0},
      {title : 'Fotografías vehículo', status : 0},
      {title : 'Accesorios vehículo', status : 0},
    ];
    TestBed.configureTestingModule({
      providers: [
        { provide: NavController, useValue: navCtrlSpy },
        { provide: Router, useValue: routerSpy },
        { provide: LoadingService, useValue: loadingServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy },
        { provide: CarPartsService, useValue: carPartsServiceSpy },
        { provide: LogInfoService, useValue: logInfoServiceSpy }
      ]
    });

    component = new CarMoreLegalPicturesPage(
      navCtrlSpy,
      loadingServiceSpy,
      alertServiceSpy,
      carPartsServiceSpy,
      logInfoServiceSpy,
      routerSpy
    );
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});