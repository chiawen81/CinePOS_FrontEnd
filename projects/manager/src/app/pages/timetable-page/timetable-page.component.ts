import { map } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
// import { Data } from '@angular/router';
import { DxSchedulerComponent } from 'devextreme-angular';
import { MovieData, RateCode, TheatreData, TimetableService } from './services/timetable.service';
import * as moment from 'moment';
import { MoviePageService } from '../movie-page/services/movie-page.service';
import { ManagerMovieListSuccessDataInner, TimetableCreateReq } from '../../api/cinePOS-api';
import { ManagerMovieListSuccessDataInnerCustomer } from '../../core/interface/movie';

@Component({
  selector: 'app-timetable-page',
  templateUrl: './timetable-page.component.html',
  styleUrls: ['./timetable-page.component.scss']
})
export class TimetablePageComponent implements OnInit {

  @ViewChild(DxSchedulerComponent, { static: false }) scheduler!: DxSchedulerComponent;

  data: any[] = [];

  currentDate!: Date;

  moviesData: MovieData[] = [];

  theaterData: TheatreData[] = [];

  movieList: MovieData[] = [];

  /** TODO: 沒型別 */
  originTheaterList: any[] = []

  movieTitle = '';

  dateCount = 7;
  dateArr: Date[] = [];

  tempTime = '';

  constructor(
    private timetableService: TimetableService,
    private movieService: MoviePageService
  ) {
    this.onAppointmentAdd = this.onAppointmentAdd.bind(this);
  }
  ngOnInit(): void {

    this.dateArr = this.createDates(this.dateCount);

    this.getTimetableList();
    this.getMovieList('');
    this.getTheaterList();
  }


  /**
   * 生成日期
   * @param num
   * @returns
   */
  createDates(num: number): Date[] {
    const dateArr: Date[] = [];
    // const today = new Date(); // 當前日期和時間
    const today = moment().add(7, 'day').startOf('week').toDate();
    this.currentDate = today;
    for (var i = 0; i < num; i++) {
      var date = new Date(today); // 複製當前日期
      date.setDate(today.getDate() + i); // 設定日期為當前日期加上索引值
      date.setHours(0, 0, 0, 0);
      dateArr.push(date);
    }
    return dateArr;
  }

  updateAppointment(event: any) {

    const param = {
      id: event.newData._id,
      movieId: event.newData.movieId,
      theaterId: event.newData.theaterId,
      startDate: moment(event.newData.startDate).toDate() as any,
      endDate: moment(event.newData.endDate).toDate() as any
    }

    const isCineTypeMatch = this.isCineTypeMatch(param.theaterId, param.movieId);
    if (!isCineTypeMatch) {
      event.cancel = true;
      alert('該廳不支援此電影類型');
      return
    }
    const checkDateConflict = this.checkDateConflict(param.startDate, param.endDate);

    if (checkDateConflict) {
      event.cancel = true;
      alert('請確認播放時段');
      return
    }


    this.timetableService.updateTimetable(param).subscribe((res) => {
      if (res) {
        alert(res.message);
        this.getTimetableList();
      }
    })
  }

  deleteAppointment(event?: any) {
    // console.log(event);
    this.timetableService.deleteTimetable(event.appointmentData._id).subscribe((res) => {
      if (res) {
        alert(res.message);
      }
    });
  }

  onAppointmentAdd(e: any) {
    const moviesData = this.movieList.filter((item) => {
      return item.id === e.itemElement.id;
    });

    const param = {
      movieId: e.itemElement.id,
      theaterId: e.itemData.theaterId,
      startDate: new Date(e.itemData.startDate),
      endDate: moment(e.itemData.startDate).add('minute', moviesData[0].runtime).toDate()
    }

    const checkCineType = this.isCineTypeMatch(param.theaterId, param.movieId);
    if (!checkCineType) {
      e.cancel = true;
      alert('該廳不支援此電影類型');
      return
    }

    const checkDateConflict = this.checkDateConflict(param.startDate, param.endDate);

    if (checkDateConflict) {
      e.cancel = true;
      alert('請確認播放時段');
      return
    }

    this.timetableService.createTimetable(param as TimetableCreateReq).subscribe((res) => {
      if (res) {
        alert(res.message);
        this.getTimetableList();
      }
    })
  }

  checkDateConflict(newStartDate: any, newEndDate: any) {

    for (var i = 0; i < this.data.length; i++) {
      const existingAppointmentStart = moment(this.data[i].startDate).valueOf();
      const existingAppointmentEnd = moment(this.data[i].endDate).valueOf();

      if (moment(newStartDate).valueOf() < existingAppointmentEnd && moment(newEndDate).valueOf() > existingAppointmentStart) {
        // 新的日程和現有的日程有時間衝突
        return true;
      }
    }

    return false;
  }

  onListDragStart(e: any) {

    e.cancel = true;
  }

  onItemDragStart(e: any) {
    // console.log(e);
    // console.log(e.fromData);
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


  onCurrentDateChange(event: any) {
    this.currentDate = moment(event).toDate();
    this.timetableService.dateSelect$.next(event);
  }

  /** 取得廳院列表 */
  private getTheaterList() {
    this.timetableService.getTheaterList().subscribe((res) => {
      if (res.data) {
        const theaterList = res.data as any[];
        this.originTheaterList = theaterList;
        this.theaterData = theaterList.map((item) => {
          const result = {
            id: item._id,
            text: `${item.name}(${item.type})`,
          }
          return result
        })
      }
    });
  }

  /** 取得時刻表 */
  private getTimetableList() {
    const today = moment().add(7, 'day').startOf('week').valueOf();
    const endDate = moment(today).add('day', 7).valueOf();

    this.timetableService.getTimetableList(today, endDate).subscribe((res: any) => {
      if (res.data) {
        const filterData = this.mapTimetable(res.data.timetable);
        this.data = filterData;
        this.moviesData = JSON.parse(JSON.stringify(this.getShowMovies(filterData)));
      }
    })
  }

  private mapTimetable(data: any[]) {
    const result = data.filter((item) => {
      if (item.movieId) {
        return item;
      };
    }).map((item) => {
      item.startDate = new Date(item.startDate);
      item.endDate = new Date(item.endDate);
      item.movie = item.movieId;
      item.color = this.transformRateColor(item.movie.rate);
      item.movieId = item.movieId._id;
      item.theaterId = item.theaterId._id;
      return item;
    });;
    return result;
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
  private getShowMovieList(data: ManagerMovieListSuccessDataInnerCustomer[]): MovieData[] {
    const result: MovieData[] = data.map((item) => {
      let movieData: MovieData = {
        id: item._id ?? '',
        text: item.title ?? '',
        runtime: (item.runtime as number) ?? null,
        color: this.transformRateColor(item.rate as RateCode),
        rateName: item.rateName,
        rate: item.rate as RateCode,
        provideVersionName: item.provideVersionName
      }
      return movieData;
    });
    return result;
  }

  private isCineTypeMatch(theaterId: string, movieId: string) {
    const movieCineType = this.movieList.find((item) => { return item.id === movieId })?.provideVersionName;
    const theaterType = this.originTheaterList.find((item) => { return String(item._id) === theaterId })?.type;

    return movieCineType?.includes(theaterType);
  }

}
