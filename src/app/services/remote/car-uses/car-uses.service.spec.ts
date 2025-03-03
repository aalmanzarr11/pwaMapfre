import { TestBed } from '@angular/core/testing';

import { CarUsesService } from './car-uses.service';
import { HttpClientService } from '../../infrastructure/http-client/http-client.service';
import { TokenService } from '../../infrastructure/token/token.service';

describe('CarUsesService', () => {
  let service: CarUsesService;

  let httpClientSpy: any;
  let tokenServiceSpy: any;

  beforeEach(() => {
    // Crear Spies
    httpClientSpy = jasmine.createSpyObj('HttpClientService', ['post']);
    tokenServiceSpy = jasmine.createSpyObj('TokenService', ['getAuthentication']);

    TestBed.configureTestingModule({
      providers: [
        CarUsesService,
        { provide: HttpClientService, useValue: httpClientSpy },
        { provide: TokenService, useValue: tokenServiceSpy }
      ]
    });

    service = TestBed.inject(CarUsesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
