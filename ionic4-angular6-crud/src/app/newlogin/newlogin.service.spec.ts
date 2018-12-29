import { TestBed } from '@angular/core/testing';

import { NewloginService } from './newlogin.service';

describe('NewloginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewloginService = TestBed.get(NewloginService);
    expect(service).toBeTruthy();
  });
});
