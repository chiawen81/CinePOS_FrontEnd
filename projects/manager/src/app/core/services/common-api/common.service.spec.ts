import { TestBed } from '@angular/core/testing';

import { CommonAPIService } from './common.service';

describe('CommonAPIService', () => {
  let service: CommonAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
