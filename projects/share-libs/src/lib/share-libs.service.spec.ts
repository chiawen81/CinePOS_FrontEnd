import { TestBed } from '@angular/core/testing';

import { ShareLibsService } from './share-libs.service';

describe('ShareLibsService', () => {
  let service: ShareLibsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareLibsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
