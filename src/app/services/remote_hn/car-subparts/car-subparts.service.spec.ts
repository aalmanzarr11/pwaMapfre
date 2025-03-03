import { TestBed } from '@angular/core/testing';

import { CarSubpartsService } from './car-subparts.service';

describe('CarSubpartsService', () => {
  let service: CarSubpartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarSubpartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
