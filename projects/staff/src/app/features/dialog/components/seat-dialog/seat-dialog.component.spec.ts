import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatDialogComponent } from './seat-dialog.component';

describe('SeatDialogComponent', () => {
  let component: SeatDialogComponent;
  let fixture: ComponentFixture<SeatDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
