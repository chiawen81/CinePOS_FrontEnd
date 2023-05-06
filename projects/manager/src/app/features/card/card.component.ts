import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'cine-card',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @HostBinding('class') class = 'cine-card';

  constructor() { }

  ngOnInit(): void {
  }

}
