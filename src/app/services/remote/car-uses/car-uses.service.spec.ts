import { TestBed } from '@angular/core/testing';

import { CarUsesService } from './car-uses.service';

describe('CarUsesService', () => {
  let service: CarUsesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarUsesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
