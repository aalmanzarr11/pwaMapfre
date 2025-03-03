import { TestBed } from '@angular/core/testing';

import { CarPartsService } from './car-parts.service';
import { HttpClientService } from '../../infrastructure/http-client/http-client.service';
import { TokenService } from '../../infrastructure/token/token.service';

describe('CarPartsService', () => {
  let service: CarPartsService;

  let httpClientSpy: any;
  let tokenServiceSpy: any;

  beforeEach(() => {
    // Crear Spies
    httpClientSpy = jasmine.createSpyObj('HttpClientService', ['post']);
    tokenServiceSpy = jasmine.createSpyObj('TokenService', ['getAuthentication']);

    TestBed.configureTestingModule({
      providers: [
        CarPartsService,
        { provide: HttpClientService, useValue: httpClientSpy },
        { provide: TokenService, useValue: tokenServiceSpy }
      ]
    });

    service = TestBed.inject(CarPartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
