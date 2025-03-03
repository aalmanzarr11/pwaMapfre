import { TestBed } from '@angular/core/testing';

import { InspectionService } from './inspection.service';
import { HttpClientService } from '../../infrastructure/http-client/http-client.service';
import { TokenService } from '../../infrastructure/token/token.service';

describe('InspectionService', () => {
  let service: InspectionService;

  let httpClientSpy: any;
  let tokenServiceSpy: any;

  beforeEach(() => {
    // Crear Spies
    httpClientSpy = jasmine.createSpyObj('HttpClientService', ['post']);
    tokenServiceSpy = jasmine.createSpyObj('TokenService', ['getAuthentication']);

    TestBed.configureTestingModule({
      providers: [
        InspectionService,
        { provide: HttpClientService, useValue: httpClientSpy },
        { provide: TokenService, useValue: tokenServiceSpy }
      ]
    });

    service = TestBed.inject(InspectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
