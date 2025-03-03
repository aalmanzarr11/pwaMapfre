import { TestBed } from '@angular/core/testing';

import { SvStringsService } from './sv-strings.service';

describe('SvStringsService', () => {
  let service: SvStringsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvStringsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
