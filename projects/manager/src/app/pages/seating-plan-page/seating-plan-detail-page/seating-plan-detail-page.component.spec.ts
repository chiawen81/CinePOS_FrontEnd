import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatingPlanDetailPageComponent } from './seating-plan-detail-page.component';

describe('SeatingPlanDetailPageComponent', () => {
  let component: SeatingPlanDetailPageComponent;
  let fixture: ComponentFixture<SeatingPlanDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatingPlanDetailPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatingPlanDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
