import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidelineBackComponent } from './guideline-back.component';

describe('GuidelineBackComponent', () => {
  let component: GuidelineBackComponent;
  let fixture: ComponentFixture<GuidelineBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuidelineBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuidelineBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
