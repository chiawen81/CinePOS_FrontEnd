import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-select',
  templateUrl: './date-select.component.html',
  styleUrls: ['./date-select.component.scss']
})
export class DateSelectComponent implements OnInit {

  @Input() date = new Date(); // 日期
  @Input() dateIndex = 0; // 日期索引
  @Output() dateEmit = new EventEmitter<string>();
  timestamp = this.date.getTime();

  weekdays = ['日', '一', '二', '三', '四', '五', '六'];

  isActive = false;

  constructor() { }

  ngOnInit(): void {
  }

  dateOutput(): void{
    this.isActive = true;
    this.dateEmit.emit(String(this.date.getTime()));
  }
}
