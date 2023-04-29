import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatingPlanPageComponent } from './seating-plan-page.component';

describe('SeatingPlanPageComponent', () => {
  let component: SeatingPlanPageComponent;
  let fixture: ComponentFixture<SeatingPlanPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatingPlanPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatingPlanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
