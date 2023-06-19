import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterViewPageComponent } from './theater-view-page.component';

describe('TheaterViewPageComponent', () => {
  let component: TheaterViewPageComponent;
  let fixture: ComponentFixture<TheaterViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheaterViewPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheaterViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
