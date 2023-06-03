import { map } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
// import { Data } from '@angular/router';
import { DxSchedulerComponent } from 'devextreme-angular';
import { MovieData, RateCode, TheatreData, TimetableService } from './services/timetable.service';
import * as moment from 'moment';
import { MoviePageService } from '../movie-page/services/movie-page.service';
import { ManagerMovieListSuccessDataInner, TimetableCreateReq } from '../../api/cinePOS-api';

@Component({
  selector: 'app-timetable-page',
  templateUrl: './timetable-page.component.html',
  styleUrls: ['./timetable-page.component.scss']
})
export class TimetablePageComponent implements OnInit {

  @ViewChild(DxSchedulerComponent, { static: false }) scheduler!: DxSchedulerComponent;

  // data: Data[];
  data: any[] = [];

  currentDate!: Date;

  moviesData: MovieData[] = [];

  theatreData: TheatreData[] = [];

  movieList: MovieData[] = [];

  movieTitle = '';

  constructor(
    private timetableService: TimetableService,
    private movieService: MoviePageService
  ) {
    this.onAppointmentAdd = this.onAppointmentAdd.bind(this);
  }
  ngOnInit(): void {
    this.getTimetableList();
    this.getMovieList('');
    this.getTheaterList();
  }


  updateAppointment(event: any) {
    console.log('update', event);
    const param = {
      id: event.newData._id,
      movieId: event.newData.movieId,
      theaterId: event.newData.theatreId,
      startDate: moment(event.newData.startDate).toDate() as any,
      endDate: moment(event.newData.endDate).toDate() as any
    }
    this.timetableService.updateTimetable(param).subscribe((res) => {
      if (res) {
        alert(res.message);
        this.getTimetableList();
      }
    })
  }

  deleteAppointment(event?: any) {
    console.log(event);
    this.timetableService.deleteTimetable(event.appointmentData._id).subscribe((res) => {
      if (res) {
        alert(res.message);
      }
    });
  }

  onAppointmentAdd(e: any) {
    const moviesData = this.movieList.filter((item) => {
      return item.id = e.itemElement.id;
    });
    console.log(e);
    console.log(e.itemElement);
    console.log(e.itemElement.id);
    const param = {
      movieId: e.itemElement.id,
      theaterId: e.itemData.theatreId,
      startDate: new Date(e.itemData.startDate),
      endDate: moment(e.itemData.startDate).add('minute', moviesData[0].runtime).toDate()
    }
    console.log(param);
    this.timetableService.createTimetable(param as TimetableCreateReq).subscribe((res) => {
      if (res) {
        alert(res.message);
        this.getTimetableList();
      }
    })
  }

  onListDragStart(e: any) {

    e.cancel = true;
  }

  onItemDragStart(e: any) {
    e.itemData = e.fromData;
  }

  onItemDragEnd(e: any) {
    if (e.toData) {
      e.cancel = true;
    }
  }

  formatTime(date: Date): string {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return `${this.pad(hours)}:${this.pad(minutes)}`;
  }

  pad(number: number): string {
    return (number < 10 ? '0' : '') + number;
  }

  /**
   * 取得電影列表
   */
  getMovieList(title: string) {
    const startDate = '';
    const endDate = '';
    this.movieService.getMovieList(1, startDate, endDate, title).subscribe(res => {
      this.movieList = this.getShowMovieList(res.data as any);

    });
  }

  /** 取得廳院列表 */
  private getTheaterList() {
    this.timetableService.getTheaterList().subscribe((res) => {
      if (res.data) {
        const theaterList = res.data as any[];
        this.theatreData = theaterList.map((item) => {
          const result = {
            id :item._id,
            text: item.name,
          }
          return result
        })
      }
    });
  }

  /** 取得時刻表 */
  private getTimetableList() {
    const startDate = moment().startOf('week').valueOf();
    const endDate = moment(startDate).add('day', 7).valueOf();
    // this.currentDate = new Date(startDate);
    // const startDate = moment('20230521').valueOf();
    // const endDate = moment(startDate).add('day', 7).valueOf();
    this.currentDate = moment(new Date(startDate)).toDate();
    console.log(this.currentDate);

    this.timetableService.getTimetableList(startDate, endDate).subscribe((res: any) => {
      if (res.data) {
        const filterData = this.mapTimetable(res.data.timetable);
        this.data = filterData;
        console.log(this.data);
        // this.theatreData = this.getTheaters(filterData);
        // console.log(this.theatreData);
        this.moviesData = JSON.parse(JSON.stringify(this.getShowMovies(filterData)));
      }
    })
  }

  private mapTimetable(data: any[]) {
    const result = data.map((item) => {
      item.startDate = new Date(item.startDate);
      item.endDate = new Date(item.endDate);
      item.movie = item.movieId;
      item.color = this.transformRateColor(item.movie.rate);
      item.movieId = item.movieId._id;
      item.theatreId = item.theaterId._id;
      return item;
    });
    return result;
  }

  private transformRateNameColor(type: string | undefined): string {
    switch (type) {
      case '普通級':
        return '#363E31';
      case '保護級':
        return '#273B44';
      case '輔12':
        return '#3E3928';
      case '輔15':
        return '#473729';
      case '限制級':
        return '#442727';
      default:
        return '';
    }
  }

  private transformRateNameToRate(type: string | undefined): RateCode | null {
    switch (type) {
      case '普通級':
        return RateCode.g;
      case '保護級':
        return RateCode.pg;
      case '輔12':
        return RateCode.pg12;
      case '輔15':
        return RateCode.pg15;
      case '限制級':
        return RateCode.r;
      default:
        return null;
    }
  }

  private transformRateColor(type: RateCode): string {
    switch (type) {
      case RateCode.g:
        return '#363E31';
      case RateCode.pg:
        return '#273B44';
      case RateCode.pg12:
        return '#3E3928';
      case RateCode.pg15:
        return '#473729';
      case RateCode.r:
        return '#442727';
      default:
        return '';
    }
  }

  /** 已建立場次的電影 */
  private getShowMovies(data: any[]): MovieData[] {
    const movieMap: { [key: string]: boolean } = {};
    const movies: MovieData[] = [];

    if (data) {
      for (const entry of data) {
        const movieId = entry.movie._id;
        const movieTitle = entry.movie.title;
        const color = entry.color;
        const runtime = entry.movie.runtime;
        const rate = entry.movie.rate;


        if (!movieMap[movieId]) {
          movieMap[movieId] = true;
          movies.push({ text: movieTitle, id: movieId, color, runtime, rate });
        }
      }
    }
    return movies;
  }

  /** 取得要顯示的電影 */
  private getShowMovieList(data: ManagerMovieListSuccessDataInner[]): MovieData[] {
    const result: MovieData[] = data.map((item) => {
      let movieData: MovieData = {
        id: item._id ?? '',
        text: item.title ?? '',
        // runtime: item.runtime?? '',
        runtime: 90,
        color: this.transformRateNameColor(item.rateName),
        rateName: item.rateName,
        rate: this.transformRateNameToRate(item.rateName) as RateCode
      }
      return movieData;
    });
    return result;
  }

}
