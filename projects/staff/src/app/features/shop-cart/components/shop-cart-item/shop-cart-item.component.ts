import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShopCartInterface } from 'projects/staff/src/app/core/interface/shop-cart.interface';

@Component({
  selector: 'app-shop-cart-item',
  templateUrl: './shop-cart-item.component.html',
  styleUrls: ['./shop-cart-item.component.scss']
})
export class ShopCartItemComponent implements OnInit {

  constructor() { }
  @Input() shopCart: ShopCartInterface = {
    ticket: [],
    seat: [],
    movieId: '',
    title: '',
    scheduleId: ''
  }
  @Input() shopCartIndex = 0;
  @Output() dateEmit = new EventEmitter<number>();

  ngOnInit(): void {
  }
  getSubtotal(): number{
    let subtotal = 0;
    this.shopCart.ticket.forEach(item => {
      subtotal += item.price;
    });
    return subtotal;
  }
  date():void{
    this.dateEmit.emit(this.shopCartIndex);
  }
}
