import { TestBed } from '@angular/core/testing';

import { HnStringsService } from './hn-strings.service';

describe('HnStringsService', () => {
  let service: HnStringsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HnStringsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
