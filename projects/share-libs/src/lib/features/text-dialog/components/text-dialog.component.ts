import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
interface TextDialogData {
  /**標題(html) */
  title: string
  /**內容(html) */
  content: string;
}

@Component({
  selector: 'lib-text-dialog',
  templateUrl: './text-dialog.component.html',
  styleUrls: ['./text-dialog.component.css']
})
export class TextDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TextDialogData,
  ) { }

  ngOnInit(): void {
  }

}
