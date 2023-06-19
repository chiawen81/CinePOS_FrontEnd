import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
//import { SeatData } from './../../../manager-seatchart/interface/seat-data.interface';
//import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-select-seat-type-dialog',
  templateUrl: './select-seat-type-dialog.component.html',
  styleUrls: ['./select-seat-type-dialog.component.scss']
})
export class SelectSeatTypeDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<SelectSeatTypeDialogComponent>
  ) { }


  ngOnInit(): void {

  }

  chooseType(selectType: any): void {
    // 將選擇的值傳回給 ManagerSeatchartSeatComponent
    this.dialogRef.close(selectType); 
  }
}
