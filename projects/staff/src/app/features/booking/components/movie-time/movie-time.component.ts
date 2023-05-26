import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-movie-time',
  templateUrl: './movie-time.component.html',
  styleUrls: ['./movie-time.component.scss']
})
export class MovieTimeComponent implements OnInit {
  @Input() movieTimeData:any = {};
  @Output() scheduleIdEmit = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  scheduleIdOutput(): void{
    this.scheduleIdEmit.emit(this.movieTimeData.scheduleId)
  }

}
