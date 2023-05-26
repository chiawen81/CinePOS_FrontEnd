import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { takeUntil } from 'rxjs';
import { ManagementService } from '../../services/management.service';

@Component({
  selector: 'app-date-select',
  templateUrl: './date-select.component.html',
  styleUrls: ['./date-select.component.scss']
})
export class DateSelectComponent implements OnInit {

  @Input() date = new Date(); // 日期
  @Input() dateIndex = 0; // 日期索引
  @Output() dateEmit = new EventEmitter<string>();

  weekdays = ['日', '一', '二', '三', '四', '五', '六'];

  isActive = false;

  constructor(
    private managementService:ManagementService
  ) { }

  ngOnInit(): void {
    this.dateIndex === 0 ? this.isActive = true: this.isActive = false;


    this.managementService.dateSelect$
      .pipe(
        takeUntil(this.managementService.onDestroy$)
      )
      .subscribe((v)=>{
        console.log(v);
        if(v === String(this.date.getTime())){
          this.isActive = true;
        }else{
          this.isActive = false;
        }
      })
  }

  dateOutput(): void{
    this.dateEmit.emit(String(this.date.getTime()));
  }

  ngOnDestroy(): void {
    this.managementService.onDestroy$.next();
  }



}
