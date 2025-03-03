import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';
import { HttpClientService } from '../http-client/http-client.service';
import { LoadingController } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConnectionService } from '../connection/connection.service';

describe('LoadingService', () => {
  let service: LoadingService;
  let loadingControllerSpy: any;
  let connectionServiceSpy: any;

  beforeEach(() => {
    loadingControllerSpy = jasmine.createSpyObj('LoadingController', ['create', 'dismiss']);
    connectionServiceSpy = jasmine.createSpyObj('ConnectionService', ['getNetworkStatus']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importamos el módulo de pruebas para HttpClient
      providers: [
        LoadingService,
        HttpClientService,
        { provide: LoadingController, useValue: loadingControllerSpy },
        { provide: ConnectionService, useValue: connectionServiceSpy }
      ]
    });

    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Agrega más pruebas aquí...
});
