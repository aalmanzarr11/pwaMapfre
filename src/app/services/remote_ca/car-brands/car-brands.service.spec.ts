import { TestBed } from '@angular/core/testing';

import { CarBrandsService } from './car-brands.service';

describe('CarBrandsService', () => {
  let service: CarBrandsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarBrandsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
