import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  @Input() movieData:any = {};
  @Output() scheduleIdEmit = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  scheduleIdOutput($event: string): void{

    this.scheduleIdEmit.emit($event)
  }
}
