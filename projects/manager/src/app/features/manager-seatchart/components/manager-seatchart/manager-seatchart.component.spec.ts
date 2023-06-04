import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSeatchartComponent } from './manager-seatchart.component';

describe('ManagerSeatchartComponent', () => {
  let component: ManagerSeatchartComponent;
  let fixture: ComponentFixture<ManagerSeatchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerSeatchartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerSeatchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
