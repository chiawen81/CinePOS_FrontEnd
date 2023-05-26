import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-movie-time',
  templateUrl: './movie-time.component.html',
  styleUrls: ['./movie-time.component.scss']
})
export class MovieTimeComponent implements OnInit {

  @Input() movieTimeData:any = {};
  @Output() scheduleIdEmit = new EventEmitter<string>();

  time = new Date();
  constructor() { }

  ngOnInit(): void {
    this.time =  new Date(this.movieTimeData.time);
  }

  scheduleIdOutput(): void{
    this.scheduleIdEmit.emit(this.movieTimeData.scheduleId)
  }

}
