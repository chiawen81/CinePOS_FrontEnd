import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOrderDetailComponent } from './dialog-order-detail.component';

describe('SelectSeatComponent', () => {
  let component: DialogOrderDetailComponent;
  let fixture: ComponentFixture<DialogOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOrderDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
