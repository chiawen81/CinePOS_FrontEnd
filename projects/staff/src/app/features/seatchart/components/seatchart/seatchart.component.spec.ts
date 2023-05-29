import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatchartComponent } from './seatchart.component';

describe('SeatchartComponent', () => {
  let component: SeatchartComponent;
  let fixture: ComponentFixture<SeatchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatchartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
