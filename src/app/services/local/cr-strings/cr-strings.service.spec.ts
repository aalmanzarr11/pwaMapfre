import { TestBed } from '@angular/core/testing';

import { CrStringsService } from './cr-strings.service';

describe('CrStringsService', () => {
  let service: CrStringsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrStringsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
