import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundItemComponent } from './refund-item.component';

describe('RefundItemComponent', () => {
  let component: RefundItemComponent;
  let fixture: ComponentFixture<RefundItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefundItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefundItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
