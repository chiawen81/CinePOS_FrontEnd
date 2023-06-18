import { TestBed } from '@angular/core/testing';

import { DashboardPageService } from './dashboard-page.service';

describe('DashboardPageService', () => {
  let service: DashboardPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
