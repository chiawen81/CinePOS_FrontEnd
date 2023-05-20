import { filter } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
// import { Data } from '@angular/router';
import { DxSchedulerComponent } from 'devextreme-angular';
import Query from 'devextreme/data/query';
import { MovieData, RateCode, TheatreData, TimetableService } from './services/timetable.service';

@Component({
  selector: 'app-timetable-page',
  templateUrl: './timetable-page.component.html',
  styleUrls: ['./timetable-page.component.scss']
})
export class TimetablePageComponent implements OnInit {

  @ViewChild(DxSchedulerComponent, { static: false }) scheduler!: DxSchedulerComponent;

  // data: Data[];
  data: any[] = [];
  movieRate = [
    {
      text: '普遍級',
      id: 1,
      color: '#363E31',
    }, {
      text: '保護級',
      id: 2,
      color: '#273B44',
    },
    {
      text: '輔導級12+',
      id: 3,
      color: '#3E3928',
    },
    {
      text: '輔導級15+',
      id: 4,
      color: '#473729',
    }, {
      text: '限制級',
      id: 5,
      color: '#442727',
    },
  ];;
  currentDate: Date = new Date('2023-07-15');
  // currentDate: Date = new Date();

  moviesData: MovieData[] = [];

  theatreData: TheatreData[] = [];


  constructor(
    private timetableService: TimetableService) { }
  ngOnInit(): void {
    this.getTimetableList()
  }

  getTimetableList() {
    this.timetableService.getTimetableList().subscribe((res) => {
      if (res.data) {
        const filterData = this.mapTimetable(res.data.timetable);
        this.data = filterData;
        console.log(this.data);
        console.log(filterData);
        this.theatreData = this.getTheaters(filterData);
        console.log(this.theatreData);
        this.moviesData = this.getMovies(filterData);
        console.log(this.moviesData);
      }
    })
  }

  mapTimetable(data: any[]) {
    const result = data.map((item) => {
      item.startDate = new Date(item.startTime);
      item.endDate = new Date(item.endTime);
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

  getMovies(data: any[]): MovieData[] {
    const movieMap: { [key: string]: boolean } = {};
    const movies: MovieData[] = [];

    if (data) {
      for (const entry of data) {
        const movieId = entry.movie._id;
        const movieTitle = entry.movie.title;
        const color = entry.color;
        const duration = entry.movie.runtime;
        const rate = entry.movie.rate;


        if (!movieMap[movieId]) {
          movieMap[movieId] = true;
          movies.push({ text: movieTitle, id: movieId, color, duration,rate });
          // theaters.push({ text: theaterName, id: id });
        }
      }
    }
    return movies;
  }

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

  deleteAppointment(event?: any) {
    console.log(event);
    this.timetableService.deleteTimetable(event.appointmentData._id).subscribe((res)=>{
      if(res){
        alert(res.message);
      }
    });
  }

  formatTime(date: Date): string {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return `${this.pad(hours)}:${this.pad(minutes)}`;
  }

  pad(number: number): string {
    return (number < 10 ? '0' : '') + number;
  }
  onAppointmentFormOpening(data: any) {
    const that = this;
    const form = data.form;
    let movieInfo = that.getMovieById(data.appointmentData.movieId) || {};
    let startDate = data.appointmentData.startDate;

    form.option('items', [{
      label: {
        text: 'Movie',
      },
      editorType: 'dxSelectBox',
      dataField: 'movieId',
      editorOptions: {
        items: that.moviesData,
        displayExpr: 'text',
        valueExpr: 'id',
        onValueChanged(args: any) {
          movieInfo = that.getMovieById(args.value);

          form.updateData('director', movieInfo.director);
          form.updateData('endDate', new Date(startDate.getTime() + 60 * 1000 * movieInfo.duration));
        },
      },
    }, {
      label: {
        text: 'Director',
      },
      name: 'director',
      editorType: 'dxTextBox',
      editorOptions: {
        value: movieInfo.director,
        readOnly: true,
      },
    }, {
      dataField: 'startDate',
      editorType: 'dxDateBox',
      editorOptions: {
        width: '100%',
        type: 'datetime',
        onValueChanged(args: any) {
          startDate = args.value;
          form.updateData('endDate', new Date(startDate.getTime() + 60 * 1000 * movieInfo.duration));
        },
      },
    }, {
      name: 'endDate',
      dataField: 'endDate',
      editorType: 'dxDateBox',
      editorOptions: {
        width: '100%',
        type: 'datetime',
        readOnly: true,
      },
    }, {
      dataField: 'price',
      editorType: 'dxRadioGroup',
      editorOptions: {
        dataSource: [5, 10, 15, 20],
        itemTemplate(itemData: any) {
          return `$${itemData}`;
        },
      },
    }]);
  }

  getDataObj(objData: any) {
    if (this.data) {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i]['startDate'].getTime() === objData.startDate.getTime() && this.data[i]['theatreId'] === objData.theatreId) { return this.data[i]; }
      }

    }
    return null;
  }

  getMovieById(id: string) {
    return Query(this.moviesData).filter(['id', '=', id]).toArray()[0];
  }

  getColor(id: number) {
    const item = this.movieRate.filter((item) => {
      return item.id === id
    });
    if (item.length > 0) {

      return item[0].color;
    }
    return '';
  }
}
