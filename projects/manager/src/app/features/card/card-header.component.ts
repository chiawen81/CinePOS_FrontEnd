import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'cine-card-header',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./card.component.scss']
})
export class CardHeaderComponent implements OnInit {
  @HostBinding('class') class = 'cine-card-header';

  constructor() { }

  ngOnInit(): void {
  }

}
