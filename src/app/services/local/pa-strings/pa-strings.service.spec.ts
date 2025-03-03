import { TestBed } from '@angular/core/testing';

import { PaStringsService } from './pa-strings.service';

describe('PaStringsService', () => {
  let service: PaStringsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaStringsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
