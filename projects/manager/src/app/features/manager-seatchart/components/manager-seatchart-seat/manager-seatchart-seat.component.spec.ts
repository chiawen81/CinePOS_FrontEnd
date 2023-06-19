import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSeatchartSeatComponent } from './manager-seatchart-seat.component';

describe('ManagerSeatchartSeatComponent', () => {
  let component: ManagerSeatchartSeatComponent;
  let fixture: ComponentFixture<ManagerSeatchartSeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerSeatchartSeatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerSeatchartSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
