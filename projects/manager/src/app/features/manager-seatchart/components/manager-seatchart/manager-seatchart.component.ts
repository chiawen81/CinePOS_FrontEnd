import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SeatData } from '../../interface/seat-data.interface';
import { SeatSettingType } from '../../enums/seat-setting.enum';

export interface SeatMapData {
  seatMap: string[];
  rowLabel: string[];
  colLabel: string[]
}

@Component({
  selector: 'app-manager-seatchart',
  templateUrl: './manager-seatchart.component.html',
  styleUrls: ['./manager-seatchart.component.scss']
})
export class ManagerSeatchartComponent implements OnInit {

  responseArr: string[] = []; // response陣列
  rowsArr: string[] = []; // rows 陣列
  colsArr: string[] = []; // cols 陣列
  rowsOrder: string[] = []; // rows 的 元素
  colsOrder: string[] = []; // cols 的 元素
  lastType: boolean = true; // 記憶上次的選項
  
  @Input() cols: number = 0; // col 個數
  @Input() rows: number = 0;; // row個數
  @Input() isPreview: boolean = false; // 是否為檢視頁
  @Input()  
    getViewData: SeatMapData = {
      seatMap: [],
      rowLabel: [],
      colLabel: []
    };

  @Input() type: boolean = true; // row是英文還數字, true:英文; false:數字
  @Input() step: number = 1; // 步驟順序

  @Output() seatMapResult = new EventEmitter<SeatMapData>();

  seatSetting!: SeatSettingType;
  constructor() { }

  ngOnInit(): void {
    this.createSeat(this.rows, this.cols);

    if(this.rowsOrder.length === 0 || this.rowsOrder.length != this.rows || this.lastType != this.type){
      this.rowsOrder = this.createRowsOrder(this.rows, this.type);

       //記憶上次type
       this.lastType = this.type;
    } 

    if(this.colsOrder.length === 0 || this.colsOrder.length != this.cols){
      this.colsOrder = this.createRowsOrder(this.cols, false);
    } 

    if(this.isPreview){
    
      console.log(this.getViewData);

      this.responseArr = this.getViewData.seatMap;
      this.rowsOrder = this.getViewData.rowLabel;
      this.colsOrder = this.getViewData.colLabel;
      this.seatSetting = 4 as SeatSettingType;
    }
  }

  ngOnChanges(): void {
    this.createSeat(this.rows, this.cols);

    if(this.rowsOrder.length === 0 || this.rowsOrder.length != this.rows || this.lastType != this.type){
      this.rowsOrder = this.createRowsOrder(this.rows, this.type);

      //記憶上次type
      this.lastType = this.type;
    } 

    if(this.colsOrder.length === 0 || this.colsOrder.length != this.cols){
      this.colsOrder = this.createRowsOrder(this.cols, false);
    } 

    if(this.isPreview){
    
      console.log(this.getViewData);

      this.responseArr = this.getViewData.seatMap;
      this.rowsOrder = this.getViewData.rowLabel;
      this.colsOrder = this.getViewData.colLabel;
      this.seatSetting = 4 as SeatSettingType;
    }
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  convertToUpperCase() {
    for (let i = 0; i < this.rowsOrder.length; i++) {
      this.rowsOrder[i] = this.rowsOrder[i].toUpperCase();
    }
  }

  selectAllText(): void {
    if (document.activeElement instanceof HTMLInputElement) {
      document.activeElement.select();
    }
  }

  activeOut($event:SeatData): void {
    // 將取到的seatIndex跟type寫回responseArr
    this.responseArr[$event.seatIndex] = $event.type;
    console.log("activeOut");
    console.log(this.responseArr);
   const param = JSON.parse(JSON.stringify({
      seatMap: this.responseArr,
      rowLabel: this.rowsOrder,
      colLabel: this.colsOrder
    }));
    this.seatMapResult.emit(param);
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
