import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterDetailPageComponent } from './theater-detail-page.component';

describe('TheaterDetailPageComponent', () => {
  let component: TheaterDetailPageComponent;
  let fixture: ComponentFixture<TheaterDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheaterDetailPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheaterDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
