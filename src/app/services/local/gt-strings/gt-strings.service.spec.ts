import { TestBed } from '@angular/core/testing';

import { GtStringsService } from './gt-strings.service';

describe('GtStringsService', () => {
  let service: GtStringsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GtStringsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
