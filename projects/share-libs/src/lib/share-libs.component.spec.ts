import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareLibsComponent } from './share-libs.component';

describe('ShareLibsComponent', () => {
  let component: ShareLibsComponent;
  let fixture: ComponentFixture<ShareLibsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareLibsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareLibsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
