import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCartItemComponent } from './shop-cart-item.component';

describe('ShopCartItemComponent', () => {
  let component: ShopCartItemComponent;
  let fixture: ComponentFixture<ShopCartItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopCartItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopCartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
