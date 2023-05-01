import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { STATIC_ROUTES } from 'projects/staff/src/app/core/constant/routes.constant';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.scss']
})
export class ShopCartComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  STATIC_ROUTES = STATIC_ROUTES;

  ngOnInit(): void {
  }
  goPayment(): void{
    // 先取得購物車資料或是只做切換路由
    this.router.navigate([STATIC_ROUTES.PAYMENT]);
  }
}
