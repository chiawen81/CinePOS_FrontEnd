import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterListPageComponent } from './theater-list-page.component';

describe('TheaterListPageComponent', () => {
  let component: TheaterListPageComponent;
  let fixture: ComponentFixture<TheaterListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheaterListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheaterListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
