import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CarAccessoriesService } from './car-accessories.service';
import { HttpClientService } from '../../infrastructure/http-client/http-client.service';
import { TokenService } from '../../infrastructure/token/token.service';
import { BaseUrl } from 'src/app/shared/baseUrl'; 
import { JsonUtilsService } from '../../infrastructure/json-utils/json-utils.service';

describe('CarAccessoriesService', () => {
  let service: CarAccessoriesService;
  let httpClientSpy: any;
  let tokenServiceSpy: any;

  beforeEach(() => {
    // Crear Spies
    httpClientSpy = jasmine.createSpyObj('HttpClientService', ['post']);
    tokenServiceSpy = jasmine.createSpyObj('TokenService', ['getAuthentication']);

    TestBed.configureTestingModule({
      providers: [
        CarAccessoriesService,
        { provide: HttpClientService, useValue: httpClientSpy },
        { provide: TokenService, useValue: tokenServiceSpy }
      ]
    });

    service = TestBed.inject(CarAccessoriesService);
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener códigos de accesorios con el token correcto', (done) => {
    const mockResponse = { status: true, data: { codes: ['A1', 'B2'] } };
    tokenServiceSpy.getAuthentication.and.returnValue('mocked-token');
    httpClientSpy.post.and.returnValue(of(mockResponse));

    service.getAccessoryCodes().subscribe(response => {
      expect(httpClientSpy.post).toHaveBeenCalledWith(
        BaseUrl.getAccessoryCodes,
        { token: 'mocked-token' },
        true
      );
      expect(response).toEqual(mockResponse);
      done();
    });
  });

  it('debería subir un accesorio con el token correcto', (done) => {
    const mockAccessory = { name: 'Radio', id: 123 };
    const mockResponse = { status: true, message: 'Uploaded' };
    tokenServiceSpy.getAuthentication.and.returnValue('mocked-token');
    httpClientSpy.post.and.returnValue(of(mockResponse));

    service.uploadAccessory(mockAccessory).subscribe(response => {
      expect(httpClientSpy.post).toHaveBeenCalledWith(
        BaseUrl.uploadAccessory,
        { token: 'mocked-token', accesorio: mockAccessory },
        false
      );
      expect(response).toEqual(mockResponse);
      done();
    });
  });

  it('debería obtener accesorios y limpiar valores nulos', (done) => {
    const inspection = { numInsp: '1001' };
    const mockResponse = {
      status: true,
      data: {
        accesorios: [
          { name: 'Parlante', description: null },
          { name: 'Llanta de repuesto', description: 'Extra' }
        ]
      }
    };

    spyOn(console, 'log'); // Evitar logs en las pruebas
    spyOn(JsonUtilsService, 'cleanNullString');

    tokenServiceSpy.getAuthentication.and.returnValue('mocked-token');
    httpClientSpy.post.and.returnValue(of(mockResponse));

    service.getAccessories(inspection).subscribe(response => {
      expect(httpClientSpy.post).toHaveBeenCalledWith(
        BaseUrl.getAccessories,
        {
          llaveInspeccion: {
            codCia: '1',
            numInsp: '1001',
            numSecu: '1',
            numRiesgo: '1'
          },
          token: 'mocked-token'
        },
        false
      );

      expect(JsonUtilsService.cleanNullString).toHaveBeenCalledTimes(2);
      expect(response).toEqual(mockResponse);
      done();
    });
  });
});
