import { TestBed } from '@angular/core/testing';

import { CarDamageService } from './car-damage.service';

describe('CarDamageService', () => {
  let service: CarDamageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarDamageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
