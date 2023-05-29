import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface SeatStyle {
  width: string;
  height: string;
}

@Component({
  selector: 'app-seatchart-seat',
  templateUrl: './seatchart-seat.component.html',
  styleUrls: ['./seatchart-seat.component.scss']
})

export class SeatchartSeatComponent implements OnInit {
  constructor() { }
  @Input() rows: string = '';
  @Input() cols: string = '';
  @Input() seatData: any = {};
  @Input() isPreview: boolean = false;
  isActive: boolean = false;
  @Output() activeOut = new EventEmitter<any>();

  ngOnInit(): void {

  }

  active(): void {
    if (!this.isPreview) {
      this.isActive = !this.isActive;
      this.activeOut.emit(
        {
          seatName: this.rows + this.seatData.cols,
          isActive: this.isActive
        }
      );
    }

  }
  ngOnChanges(): void {
  }

}
