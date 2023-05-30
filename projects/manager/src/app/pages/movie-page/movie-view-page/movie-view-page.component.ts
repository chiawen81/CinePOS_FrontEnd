import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviePageService } from '../services/movie-page.service';
import { MovieDetailResCustomer } from '../../../core/interface/movie';

@Component({
  selector: 'app-movie-view-page',
  templateUrl: './movie-view-page.component.html',
  styleUrls: ['./movie-view-page.component.scss']
})

export class MovieViewPageComponent implements OnInit {
  movieInfoAPI!: MovieDetailResCustomer;                                                       // API- 電影資訊
  movieId!: string;                                                                            // 電影ID

  constructor(
    private _Route: ActivatedRoute,
    private _MoviePageService: MoviePageService,
    private _ChangeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.movieId = this._Route.snapshot?.params['id'];
    console.log('movieId', this.movieId);
    this.getMovieInfoAPI(this.movieId);                        // API- 取得電影資訊
  }



  // ————————————————————————————————  API  ————————————————————————————————
  // API- 取得電影資訊
  getMovieInfoAPI(id: string): void {
    setTimeout(() => {
      this._MoviePageService.getMovieDetail(id).subscribe(res => {
        console.log(res)
        this.movieInfoAPI = res.data as MovieDetailResCustomer;
        this._ChangeDetectorRef.detectChanges();
      });
    });
  }


}
