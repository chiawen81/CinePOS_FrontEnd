import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetablePageComponent } from './timetable-page.component';

describe('TimetablePageComponent', () => {
  let component: TimetablePageComponent;
  let fixture: ComponentFixture<TimetablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimetablePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimetablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
