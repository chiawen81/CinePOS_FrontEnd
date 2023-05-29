import { Component, Input, OnInit } from '@angular/core';
interface SeatData {
  seatName: string;
  isActive: boolean;
}
@Component({
  selector: 'app-seatchart',
  templateUrl: './seatchart.component.html',
  styleUrls: ['./seatchart.component.scss']
})
export class SeatchartComponent implements OnInit {

  @Input() seatData: any = {};
  @Input() isPreview:boolean = true;
  constructor() { }
  noneSeat = {
    "cols": "",
    "status": 0,
    "type": "N"
  };
  seatArray: string[] = [];

  ngOnInit(): void {
    if(this.isPreview){
      
    }
  }

  tt($event: SeatData): void {
    if ($event.isActive) {
      this.seatArray.push($event.seatName);
    } else {
      this.seatArray = this.seatArray.filter((item) => item !== $event.seatName);
    }
    console.log('this.seatArray',this.seatArray);
  }
}
