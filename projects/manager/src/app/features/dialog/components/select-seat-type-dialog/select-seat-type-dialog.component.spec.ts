import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSeatTypeDialogComponent } from './select-seat-type-dialog.component';

describe('SelectSeatTypeDialogComponent', () => {
  let component: SelectSeatTypeDialogComponent;
  let fixture: ComponentFixture<SelectSeatTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSeatTypeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSeatTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
