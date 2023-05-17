import { Component, OnInit, ViewChild } from '@angular/core';
import { Data } from '@angular/router';
import { DxSchedulerComponent } from 'devextreme-angular';
import Query from 'devextreme/data/query';
import { MovieData, TheatreData, TimetableService } from './services/timetable.service';

@Component({
  selector: 'app-timetable-page',
  templateUrl: './timetable-page.component.html',
  styleUrls: ['./timetable-page.component.scss']
})
export class TimetablePageComponent implements OnInit {

  @ViewChild(DxSchedulerComponent, { static: false }) scheduler!: DxSchedulerComponent;

  data: Data[];
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
  currentDate: Date = new Date(2021, 3, 27);

  moviesData: MovieData[];

  theatreData: TheatreData[];


  constructor(service: TimetableService) {
    this.data = service.getData();
    this.moviesData = service.getMoviesData();
    this.theatreData = service.getTheatreData();
  }
  ngOnInit(): void {
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
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i]['startDate'].getTime() === objData.startDate.getTime() && this.data[i]['theatreId'] === objData.theatreId) { return this.data[i]; }
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
