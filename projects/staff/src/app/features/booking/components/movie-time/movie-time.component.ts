import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-time',
  templateUrl: './movie-time.component.html',
  styleUrls: ['./movie-time.component.scss']
})
export class MovieTimeComponent implements OnInit {
  @Input() movieTimeData:any = {};
  constructor() { }

  ngOnInit(): void {
  }

}
