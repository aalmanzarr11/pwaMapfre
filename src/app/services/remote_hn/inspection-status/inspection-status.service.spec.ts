import { TestBed } from '@angular/core/testing';

import { InspectionStatusService } from './inspection-status.service';

describe('InspectionStatusService', () => {
  let service: InspectionStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InspectionStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
