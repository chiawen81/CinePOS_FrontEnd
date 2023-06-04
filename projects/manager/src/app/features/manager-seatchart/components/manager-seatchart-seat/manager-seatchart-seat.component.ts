import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SeatData, seatType } from '../../interface/seat-data.interface';


@Component({
  selector: 'app-manager-seatchart-seat',
  templateUrl: './manager-seatchart-seat.component.html',
  styleUrls: ['./manager-seatchart-seat.component.scss']
})
export class ManagerSeatchartSeatComponent implements OnInit {

  constructor() { }
  /** */
  @Input() seatIndex: number = 0;
  @Input() step: number = 1;

  @Output() activeOut = new EventEmitter<SeatData>();
  /** N: 非座位/ -1: 不開放 / 0: 普通 / 1: 殘障 */
  type: seatType = '0';

  ngOnInit(): void {
  }

  active(): void {
    switch (this.step) {
      case 1:
        this.type === '0'? this.type = 'N' : this.type = '0';
        break;
      case 3:
        // 1. 開啟彈跳視窗選擇需使用的type
        // 2. 將this.type 改成選取的type
        break;
    }
    // 將選擇到的座位跟type 回傳給 manager-seatchart去修改 responseArr
    this.activeOut.emit({
      seatIndex: this.seatIndex,
      type: this.type
    });
  }

}
