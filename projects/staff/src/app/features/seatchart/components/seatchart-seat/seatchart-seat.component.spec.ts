import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatchartSeatComponent } from './seatchart-seat.component';

describe('SeatchartSeatComponent', () => {
  let component: SeatchartSeatComponent;
  let fixture: ComponentFixture<SeatchartSeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatchartSeatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatchartSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
