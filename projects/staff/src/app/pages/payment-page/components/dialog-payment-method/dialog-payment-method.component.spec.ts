import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPaymentMethodComponent } from './dialog-payment-method.component';

describe('SelectSeatComponent', () => {
  let component: DialogPaymentMethodComponent;
  let fixture: ComponentFixture<DialogPaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPaymentMethodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
