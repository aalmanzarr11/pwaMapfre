import { TestBed } from '@angular/core/testing';

import { CustomerService } from './customer.service';
import { TokenService } from '../../infrastructure/token/token.service';
import { HttpClientService } from '../../infrastructure/http-client/http-client.service';

describe('CustomerService', () => {
  let service: CustomerService;

  let httpClientSpy: any;
  let tokenServiceSpy: any;

  beforeEach(() => {
    // Crear Spies
    httpClientSpy = jasmine.createSpyObj('HttpClientService', ['post']);
    tokenServiceSpy = jasmine.createSpyObj('TokenService', ['getAuthentication']);

    TestBed.configureTestingModule({
      providers: [
        CustomerService,
        { provide: HttpClientService, useValue: httpClientSpy },
        { provide: TokenService, useValue: tokenServiceSpy }
      ]
    });

    service = TestBed.inject(CustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
