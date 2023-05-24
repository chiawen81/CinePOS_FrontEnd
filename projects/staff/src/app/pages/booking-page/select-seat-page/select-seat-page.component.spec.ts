import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSeatPageComponent } from './select-seat-page.component';

describe('SelectSeatPageComponent', () => {
  let component: SelectSeatPageComponent;
  let fixture: ComponentFixture<SelectSeatPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSeatPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSeatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
