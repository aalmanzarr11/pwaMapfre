import { TestBed } from '@angular/core/testing';

import { UserinfoWebService } from './userinfo-web.service';

describe('UserinfoWebService', () => {
  let service: UserinfoWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserinfoWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
