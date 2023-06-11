import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SeatData, seatType } from '../../interface/seat-data.interface';
import { MatDialog } from '@angular/material/dialog';
import { SelectSeatTypeDialogComponent } from '../../../dialog/components/select-seat-type-dialog/select-seat-type-dialog.component';

@Component({
  selector: 'app-manager-seatchart-seat',
  templateUrl: './manager-seatchart-seat.component.html',
  styleUrls: ['./manager-seatchart-seat.component.scss']
})
export class ManagerSeatchartSeatComponent implements OnInit {

  constructor(private dialog: MatDialog) { }
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

        // 將選擇到的座位跟type 回傳給 manager-seatchart去修改 responseArr
        this.activeOut.emit({
          seatIndex: this.seatIndex,
          type: this.type
        });
        break;
      case 3:
        // 1. 開啟彈跳視窗選擇需使用的type
        // 2. 將this.type 改成選取的type
        const dialogRef = this.dialog.open(SelectSeatTypeDialogComponent, {
          width: '50%',
          height: '28%'
        });
      
        dialogRef.afterClosed().subscribe(result => {
          // 在彈跳視窗關閉後，獲取選項的值
          this.type = result? result : this.type;

          // 要把type傳過去 不然訂閱會改到全部
          // 將選擇到的座位跟type 回傳給 manager-seatchart去修改 responseArr
          this.activeOut.emit({
            seatIndex: this.seatIndex,
            type: this.type
          });
        });
        break;
    }
  }

}
