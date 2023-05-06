import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'cine-card-content',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./card.component.scss']
})
export class CardContentComponent implements OnInit {
  @HostBinding('class') class = 'cine-card-content';

  constructor() { }

  ngOnInit(): void {
  }

}
