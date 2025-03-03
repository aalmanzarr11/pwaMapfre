import { TestBed } from '@angular/core/testing';

import { CarBrandsService } from './car-brands.service';
import { HttpClientService } from '../../infrastructure/http-client/http-client.service';
import { TokenService } from '../../infrastructure/token/token.service';

describe('CarBrandsService', () => {
  let service: CarBrandsService;

  let httpClientSpy: any;
  let tokenServiceSpy: any;

  beforeEach(() => {
    // Crear Spies
    httpClientSpy = jasmine.createSpyObj('HttpClientService', ['post']);
    tokenServiceSpy = jasmine.createSpyObj('TokenService', ['getAuthentication']);

    TestBed.configureTestingModule({
      providers: [
        CarBrandsService,
        { provide: HttpClientService, useValue: httpClientSpy },
        { provide: TokenService, useValue: tokenServiceSpy }
      ]
    });

    service = TestBed.inject(CarBrandsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
