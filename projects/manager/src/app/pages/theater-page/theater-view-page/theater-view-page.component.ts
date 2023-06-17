import { Component, OnInit } from '@angular/core';
import { TheaterService } from './../services/theater.service';
import { ActivatedRoute } from '@angular/router';

export interface SeatMapData {
  seatMap: string[];
  rowLabel: string[];
  colLabel: string[]
}

@Component({
  selector: 'app-theater-view-page',
  templateUrl: './theater-view-page.component.html',
  styleUrls: ['./theater-view-page.component.scss']
})
export class TheaterViewPageComponent implements OnInit {

  theaterId: string = "";  
  rows: number = 0;
  cols: number = 0;
  getViewData: SeatMapData = {
    seatMap: [],
    rowLabel: [],
    colLabel: []
  };

  theaterTypes: { [key: number]: string } = {
    1: '2D',
    2: '3D',
    3: 'IMAX',
    4: '4DX',
  };

  /* API */
  theaterData: any;

  constructor(
    private route: ActivatedRoute,
    private theaterService: TheaterService
  ) {}

  ngOnInit(): void {
    this.theaterId = this.route.snapshot.params['id'];
    this.getTheaterInfo(this.theaterId); // API- 取得影廳資訊
  }

  // ————————————————————————————————  API  ————————————————————————————————
  // API- 取得影廳資訊
  getTheaterInfo(id: string): void {
    setTimeout(() => {
      this.theaterService.getTheaterInfo(id).subscribe(res => {
        console.log(res)
        this.theaterData = res.data;
        this.rows = res.data.row;
        this.cols = res.data.col;
        this.getViewData.rowLabel = res.data.rowLabel;
        this.getViewData.colLabel = res.data.colLabel;
        this.getViewData.seatMap = res.data.seatMap;
      });
    });
  }
}
