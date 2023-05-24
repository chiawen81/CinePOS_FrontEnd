import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTypePageComponent } from './ticket-type-page.component';

describe('TicketTypePageComponent', () => {
  let component: TicketTypePageComponent;
  let fixture: ComponentFixture<TicketTypePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketTypePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketTypePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
