import { TestBed } from '@angular/core/testing';

import { NiStringsService } from './ni-strings.service';

describe('NiStringsService', () => {
  let service: NiStringsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NiStringsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
