import { SeatData } from 'projects/manager/src/app/features/manager-seatchart/interface/seat-data.interface';
import { Step } from './../../enums/step';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {
  Step = Step;

  responseArr: string[] = []; // response陣列
  rowsArr: string[] = []; // rows 陣列
  colsArr: string[] = []; // cols 陣列
  rowsOrder: string[] = []; // rows 的 元素
  colsOrder: string[] = []; // cols 的 元素
  lastType: boolean = true; // 記憶上次的選項

  /**
   * row是英文還數字
   * - true:英文; 
   * - false:數字
   */
  type: boolean = true;
  @Input() step: number = Step.createMap; // 步驟順序

  @Output() fg = new EventEmitter<FormGroup>();
  validateForm!: FormGroup;
  constructor(
    // public parentF: FormGroupDirective,

  ) { }

  ngOnInit(): void {
    // 裝進去一次之後，根表單會控管
    this.fg.emit(this.validateForm);
  }

  /**
   * 根據提供的參數生成座位圖。
   *
   * @param {number} cols - 座位圖的列數。
   * @param {number} rows - 座位圖的行數。
   * @param {boolean} type - 座位圖的類型（可選）。
   */
  seatChartGenerator(cols: number, rows: number, type: boolean) {

    this.responseArr = Array(rows * cols).fill('0'); // 生成 responseArr
    this.rowsArr = Array(rows).fill('0'); // 生成 rowsArr
    this.colsArr = Array(cols).fill('0'); // 生成 colsArr
    this.type = type
    this.rowsOrder = this.createRowsOrder(rows,type);
    this.colsOrder = this.createRowsOrder(rows,false);

  }

  activeOut($event: SeatData): void {
    // 將取到的seatIndex跟type寫回responseArr
    this.responseArr[$event.seatIndex] = $event.type;
    console.log("activeOut");
    console.log(this.responseArr);
    const param = JSON.parse(JSON.stringify({
      seatMap: this.responseArr,
      rowLabel: this.rowsOrder,
      colLabel: this.colsOrder
    }));
    // this.seatMapResult.emit(param);
  }
  selectAllText(): void {
    if (document.activeElement instanceof HTMLInputElement) {
      document.activeElement.select();
    }
  }

  // 切換直排英文或數字顯示
  private createRowsOrder(rows: number, isEnglish: boolean): string[] {
    const arr: string[] = [];
    const startCharCode = 'A'.charCodeAt(0); // 獲取 'A' 的 Unicode 編碼
    for (let i = 0; i < rows; i++) {
      const val = isEnglish ? String.fromCharCode(startCharCode + i) : String(i + 1);
      arr.push(val);
    }
    return arr;
  }
}
