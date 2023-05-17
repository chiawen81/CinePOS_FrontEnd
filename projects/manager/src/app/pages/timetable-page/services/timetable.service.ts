import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  constructor() { }
  getTheatreData() {
    return theatreData;
  }

  getMoviesData() {
    return moviesData;
  }

  getData() {
    return data;
  }
}

export interface Assignee {
  text: string;

  id: number;

  color: string;
}



export class MovieData {
  id: number;

  text: string;

  director: string;

  year: number;

  image: string;

  duration: number;

  color: string;

  constructor(data: MovieData) {
    this.id = data.id;
    this.text = data.text;
    this.director = data.director;
    this.year = data.year;
    this.image = data.image;
    this.duration = data.duration;
    this.color = data.color;
  }
}

export interface TheatreData {
  text: string;

  id: number;
}

export interface Data {
  theatreId: number;

  movieId: number;

  price: number;

  startDate: Date;

  endDate: Date;

  rate?: number;

  rateName: string;
}

const moviesData: MovieData[] = [{
  id: 1,
  text: 'His Girl Friday',
  director: 'Howard Hawks',
  year: 1940,
  image: 'images/movies/HisGirlFriday.jpg',
  duration: 92,
  color: '#cb6bb2',
}, {
  id: 2,
  text: 'Royal Wedding',
  director: 'Stanley Donen',
  year: 1951,
  image: 'images/movies/RoyalWedding.jpg',
  duration: 93,
  color: '#56ca85',
}, {
  id: 3,
  text: 'A Star Is Born',
  director: 'William A. Wellman',
  year: 1937,
  image: 'images/movies/AStartIsBorn.jpg',
  duration: 111,
  color: '#1e90ff',
}, {
  id: 4,
  text: 'The Screaming Skull',
  director: 'Alex Nicol',
  year: 1958,
  image: 'images/movies/ScreamingSkull.jpg',
  duration: 68,
  color: '#ff9747',
}, {
  id: 5,
  text: "It's a Wonderful Life",
  director: 'Frank Capra',
  year: 1946,
  image: 'images/movies/ItsAWonderfulLife.jpg',
  duration: 130,
  color: '#f05797',
}, 
{
  id: 6,
  text: 'City Lights',
  director: 'Charlie Chaplin',
  year: 1931,
  image: 'images/movies/CityLights.jpg',
  duration: 87,
  color: '#2a9010',
}
];

const theatreData: TheatreData[] = [{
  text: '第一廳',
  id: 0,
},
{
  text: '第二廳',
  id: 1,
},
{
  text: '第三廳',
  id: 2,
},
];

const data: Data[] = [{
  theatreId: 0,
  movieId: 3,
  price: 10,
  startDate: new Date('2021-04-26T16:10:00.000Z'),
  endDate: new Date('2021-04-26T18:01:00.000Z'),
  rate: 1,
  rateName: '普遍級'
}, {
  theatreId: 0,
  movieId: 1,
  price: 5,
  startDate: new Date('2021-04-26T18:30:00.000Z'),
  endDate: new Date('2021-04-26T20:02:00.000Z'),
  rate: 2,
  rateName: '保護級'
}, {
  theatreId: 0,
  movieId: 3,
  price: 15,
  startDate: new Date('2021-04-26T20:30:00.000Z'),
  endDate: new Date('2021-04-26T22:21:00.000Z'),
  rate: 3,
  rateName: '輔導級12+'
}, {
  theatreId: 1,
  movieId: 4,
  price: 5,
  startDate: new Date('2021-04-26T23:00:00.000Z'),
  endDate: new Date('2021-04-27T00:08:00.000Z'),
  rate: 4,
  rateName: '輔導級15+'
}, {
  theatreId: 1,
  movieId: 2,
  price: 10,
  startDate: new Date('2021-04-27T10:30:00.000Z'),
  endDate: new Date('2021-04-27T12:03:00.000Z'),
  rate: 5,
  rateName: '限制級'
}, {
  theatreId: 2,
  movieId: 1,
  price: 10,
  startDate: new Date('2021-04-26T08:30:00.000Z'),
  endDate: new Date('2021-04-26T10:02:00.000Z'),
  rate: 3,
  rateName: '輔導級12+'
}, {
  theatreId: 2,
  movieId: 2,
  price: 10,
  startDate: new Date('2021-04-27T04:20:00.000Z'),
  endDate: new Date('2021-04-27T05:53:00.000Z'),
  rate: 3,
  rateName: '輔導級12+'
}
];