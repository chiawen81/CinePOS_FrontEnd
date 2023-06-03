import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTimeComponent } from './movie-time.component';

describe('MovieTimeComponent', () => {
  let component: MovieTimeComponent;
  let fixture: ComponentFixture<MovieTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
