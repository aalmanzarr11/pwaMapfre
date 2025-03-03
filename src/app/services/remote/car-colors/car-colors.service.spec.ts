import { TestBed } from '@angular/core/testing';

import { CarColorsService } from './car-colors.service';

describe('CarColorsService', () => {
  let service: CarColorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarColorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
