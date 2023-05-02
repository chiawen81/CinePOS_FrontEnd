import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundPageComponent } from './refund-page.component';

describe('RefundPageComponent', () => {
  let component: RefundPageComponent;
  let fixture: ComponentFixture<RefundPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefundPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefundPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
