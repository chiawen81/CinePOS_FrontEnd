import { Component, OnInit } from '@angular/core';
import { SeatData } from '../../interface/seat-data.interface';


@Component({
  selector: 'app-manager-seatchart',
  templateUrl: './manager-seatchart.component.html',
  styleUrls: ['./manager-seatchart.component.scss']
})
export class ManagerSeatchartComponent implements OnInit {
  rows = 10; // row個數
  cols = 15; // col 個數
  responseArr: string[] = []; // response陣列
  rowsArr: string[] = []; // rows 陣列
  colsArr: string[] = []; // cols 陣列
  rowsOrder: string[] = []; // rows 的 元素
  step = 1; // 步驟順序

  constructor() { }

  ngOnInit(): void {
    this.createSeat(this.rows, this.cols);
    this.rowsOrder = this.createRowsOrder(this.rows,true);
  }

  activeOut($event:SeatData): void {
    // 將取到的seatIndex跟type寫回responseArr
    this.responseArr[$event.seatIndex] = $event.type;
    console.log(this.responseArr);
  }


  createSeat(rows: number, cols: number): void {
    this.responseArr = Array(rows * cols).fill('0'); // 生成 responseArr
    this.rowsArr = Array(rows).fill('0'); // 生成 rowsArr
    this.colsArr = Array(cols).fill('0'); // 生成 colsArr
  }

  // 切換直排英文或數字顯示
  createRowsOrder(rows: number , isEnglish: boolean): string[] {
    const arr: string[] = [];
    const startCharCode = 'A'.charCodeAt(0); // 獲取 'A' 的 Unicode 編碼
      for (let i = 0; i < rows; i++) {
        const val = isEnglish? String.fromCharCode(startCharCode + i) : String(i+1);
        arr.push(val);
      }
    return arr;
  }

}
