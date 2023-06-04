import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { takeUntil } from 'rxjs';
import { TimetableService } from '../../services/timetable.service';

@Component({
  selector: 'app-date-select',
  templateUrl: './date-select.component.html',
  styleUrls: ['./date-select.component.scss']
})
export class DateSelectComponent implements OnInit {

  @Input() date = new Date(); // 日期
  @Input() dateIndex = 0; // 日期索引
  @Output() dateEmit = new EventEmitter<number>();

  weekdays = ['日', '一', '二', '三', '四', '五', '六'];

  isActive = false;

  constructor(
    private timetableService:TimetableService
  ) { }

  ngOnInit(): void {
    this.dateIndex === 0 ? this.isActive = true: this.isActive = false;


    this.timetableService.dateSelect$
      .pipe(
        takeUntil(this.timetableService.onDestroy$)
      )
      .subscribe((v)=>{
        
        if(v === (this.date.getTime())){
          this.isActive = true;
        }else{
          this.isActive = false;
        }
      })
  }

  dateOutput(): void{
    this.dateEmit.emit((this.date.getTime()));
  }

  ngOnDestroy(): void {
    this.timetableService.onDestroy$.next();
  }



}
