import { filter } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
// import { Data } from '@angular/router';
import { DxSchedulerComponent } from 'devextreme-angular';
import Query from 'devextreme/data/query';
import { MovieData, RateCode, TheatreData, TimetableService } from './services/timetable.service';
import * as moment from 'moment';
import { MoviePageService } from '../movie-page/services/movie-page.service';
import { ManagerMovieListSuccessDataInnerCustomer } from '../../core/interface/movie';

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


  constructor(
    private timetableService: TimetableService,
    private movieService: MoviePageService
  ) {
    this.onAppointmentAdd = this.onAppointmentAdd.bind(this);
  }
  ngOnInit(): void {
    this.getTimetableList();
    this.getMovieList();
  }

  getTimetableList() {
    const startDate = moment().startOf('week').valueOf();
    const endDate = moment(startDate).add('day', 7).valueOf();
    this.currentDate = new Date(startDate);
    this.timetableService.getTimetableList(startDate, endDate).subscribe((res: any) => {
      console.log(res);
      if (res.data) {
        const filterData = this.mapTimetable(res.data.timetable);
        this.data = filterData;
        console.log(this.data);
        console.log(filterData);
        this.theatreData = this.getTheaters(filterData);
        console.log(this.theatreData);
        // this.moviesData = this.getMovies(filterData);
        console.log('moviesData', this.moviesData);
      }
    })
  }

  mapTimetable(data: any[]) {
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

  transformRateColor(type: RateCode): string {
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

  // getMovies(data: any[]): MovieData[] {
  //   const movieMap: { [key: string]: boolean } = {};
  //   const movies: MovieData[] = [];

  //   if (data) {
  //     for (const entry of data) {
  //       const movieId = entry.movie._id;
  //       const movieTitle = entry.movie.title;
  //       const color = entry.color;
  //       const duration = entry.movie.runtime;
  //       const rate = entry.movie.rate;


  //       if (!movieMap[movieId]) {
  //         movieMap[movieId] = true;
  //         movies.push({ text: movieTitle, id: movieId, color, duration, rate });
  //         // theaters.push({ text: theaterName, id: id });
  //       }
  //     }
  //   }
  //   return movies;
  // }

  /** TODO: 應該要get所有的廳院 */
  getTheaters(data: any[]): TheatreData[] {
    const theaterMap: { [key: string]: boolean } = {};
    const theaters: TheatreData[] = [];

    if (this.data) {
      for (const entry of data) {
        const theaterId = entry.theaterId._id;
        const theaterName = entry.theaterId.name;


        if (!theaterMap[theaterId]) {
          theaterMap[theaterId] = true;
          theaters.push({ text: theaterName, id: theaterId });
          // theaters.push({ text: theaterName, id: id });
        }
      }
    }
    return theaters;
  }

  updateAppointment(event: any) {
    console.log('upate', event);
    const param = {
      _id: event.newData._id,
      movieId: event.newData.movieId,
      theaterId: event.newData.theatreId,
      startDate: event.newData.startDate,
      endDate: event.newData.endDate
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
    const moviesData = this.moviesData.filter((item) => {
      return item._id = e.itemElement.id;
    });
    console.log(e);
    console.log(e.itemElement);
    console.log(e.itemElement.id);
    const param = {
      movieId: e.itemElement._id,
      theaterId: e.itemData.theatreId,
      startDate: new Date(e.itemData.startDate),
      endDate: moment(e.itemData.startDate).add('minute', moviesData[0].runtime).toDate()
    }
    console.log(param);
    this.timetableService.createTimetable(param).subscribe((res) => {
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
  // onAppointmentFormOpening(data: any) {
  //   const that = this;
  //   const form = data.form;
  //   let movieInfo = that.getMovieById(data.appointmentData.movieId) || {};
  //   let startDate = data.appointmentData.startDate;

  //   form.option('items', [{
  //     label: {
  //       text: 'Movie',
  //     },
  //     editorType: 'dxSelectBox',
  //     dataField: 'movieId',
  //     editorOptions: {
  //       items: that.moviesData,
  //       displayExpr: 'text',
  //       valueExpr: 'id',
  //       onValueChanged(args: any) {
  //         movieInfo = that.getMovieById(args.value);

  //         form.updateData('director', movieInfo.director);
  //         form.updateData('endDate', new Date(startDate.getTime() + 60 * 1000 * movieInfo.duration));
  //       },
  //     },
  //   }, {
  //     label: {
  //       text: 'Director',
  //     },
  //     name: 'director',
  //     editorType: 'dxTextBox',
  //     editorOptions: {
  //       value: movieInfo.director,
  //       readOnly: true,
  //     },
  //   }, {
  //     dataField: 'startDate',
  //     editorType: 'dxDateBox',
  //     editorOptions: {
  //       width: '100%',
  //       type: 'datetime',
  //       onValueChanged(args: any) {
  //         startDate = args.value;
  //         form.updateData('endDate', new Date(startDate.getTime() + 60 * 1000 * movieInfo.duration));
  //       },
  //     },
  //   }, {
  //     name: 'endDate',
  //     dataField: 'endDate',
  //     editorType: 'dxDateBox',
  //     editorOptions: {
  //       width: '100%',
  //       type: 'datetime',
  //       readOnly: true,
  //     },
  //   }, {
  //     dataField: 'price',
  //     editorType: 'dxRadioGroup',
  //     editorOptions: {
  //       dataSource: [5, 10, 15, 20],
  //       itemTemplate(itemData: any) {
  //         return `$${itemData}`;
  //       },
  //     },
  //   }]);
  // }

  getMovieById(id: string) {
    return Query(this.moviesData).filter(['id', '=', id]).toArray()[0];
  }

  /**
   * // TODO 這個狀態沒有寫enum
   */
  getMovieList(){
    const startDate = moment(this.currentDate).format('yyyy/MM/DD');
    const endDate = moment(startDate).add(7,'d').format('yyyy/MM/DD');
    this.movieService.getMovieList(1, startDate, endDate, '').subscribe(res => {
      console.log('取得列表資料-成功res', res);
      this.moviesData = res.data as MovieData[];

    });
  }
}
