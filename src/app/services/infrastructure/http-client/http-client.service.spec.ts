import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientService } from './http-client.service';
import { ConnectionService, ConnectionStatus } from '../connection/connection.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('HttpClientService', () => {
  let service: HttpClientService;
  let httpMock: HttpTestingController;
  let connectionServiceSpy: any;

  beforeEach(() => {
    const connectionSpy = jasmine.createSpyObj('ConnectionService', ['getNetworkStatus']);
    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpClientService,
        { provide: ConnectionService, useValue: connectionSpy }
      ]
    });
    
    service = TestBed.inject(HttpClientService);
    httpMock = TestBed.inject(HttpTestingController);
    connectionServiceSpy = TestBed.inject(ConnectionService) ;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform a GET request successfully', () => {
    const dummyData = { message: 'success' };
    connectionServiceSpy.getNetworkStatus.and.returnValue(of(ConnectionStatus.Online));
    
    service.get('https://api.example.com/test').subscribe(response => {
      expect(response.status).toBe(true);
      expect(response.data).toEqual(dummyData);
    });
    
    const req = httpMock.expectOne('https://api.example.com/test');
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should return an error when offline', () => {
    connectionServiceSpy.getNetworkStatus.and.returnValue(of(ConnectionStatus.Offline));
    
    service.get('https://api.example.com/test').subscribe(response => {
      expect(response.status).toBe(false);
      expect(response.data).toBe('No hay conexión a internet');
    });
  });

  it('should perform a POST request successfully', () => {
    const dummyData = { success: true };
    connectionServiceSpy.getNetworkStatus.and.returnValue(of(ConnectionStatus.Online));
    
    service.post('https://api.example.com/post', { key: 'value' }).subscribe(response => {
      expect(response.status).toBe(true);
      expect(response.data).toEqual(dummyData);
    });
    
    const req = httpMock.expectOne('https://api.example.com/post');
    expect(req.request.method).toBe('POST');
    req.flush(dummyData);
  });

  it('should return an error for POST when offline', () => {
    connectionServiceSpy.getNetworkStatus.and.returnValue(of(ConnectionStatus.Offline));
    
    service.post('https://api.example.com/post', { key: 'value' }).subscribe(response => {
      expect(response.status).toBe(false);
      expect(response.data).toBe('No hay conexión a internet');
    });
  });
});
