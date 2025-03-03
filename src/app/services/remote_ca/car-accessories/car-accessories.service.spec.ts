import { TestBed } from '@angular/core/testing';

import { CarAccessoriesService } from './car-accessories.service';

describe('CarAccessoriesService', () => {
  let service: CarAccessoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarAccessoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
