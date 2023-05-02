import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileGialogComponent } from './profile-gialog.component';

describe('ProfileGialogComponent', () => {
  let component: ProfileGialogComponent;
  let fixture: ComponentFixture<ProfileGialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileGialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileGialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
