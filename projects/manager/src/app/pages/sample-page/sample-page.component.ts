import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample-page',
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.scss']
})
export class SamplePageComponent implements OnInit {

  sampleList:any[] = [
    { title: "The Shawshank Redemption", director: "Frank Darabont", year: 1994, genre: "Drama", rating: 9.3 },
    { title: "The Godfather", director: "Francis Ford Coppola", year: 1972, genre: "Crime, Drama", rating: 9.2 },
    { title: "The Dark Knight", director: "Christopher Nolan", year: 2008, genre: "Action, Crime, Drama", rating: 9.0 },
    { title: "Schindler's List", director: "Steven Spielberg", year: 1993, genre: "Biography, Drama, History", rating: 8.9 },
    { title: "Pulp Fiction", director: "Quentin Tarantino", year: 1994, genre: "Crime, Drama", rating: 8.9 }
  ]

  constructor() { }

  ngOnInit(): void {
  }


}
