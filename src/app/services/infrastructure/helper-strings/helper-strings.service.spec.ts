import { TestBed } from '@angular/core/testing';

import { HelperStringsService } from './helper-strings.service';

describe('HelperStringsService', () => {
  let service: HelperStringsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelperStringsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
