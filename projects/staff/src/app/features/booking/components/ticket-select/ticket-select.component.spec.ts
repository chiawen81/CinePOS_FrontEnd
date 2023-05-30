import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSelectComponent } from './ticket-select.component';

describe('TicketSelectComponent', () => {
  let component: TicketSelectComponent;
  let fixture: ComponentFixture<TicketSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
