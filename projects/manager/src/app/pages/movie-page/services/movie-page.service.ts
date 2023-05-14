import { Injectable } from '@angular/core';
import { filter, Observable, tap } from 'rxjs';
import { ManagerService, } from '../../../api/cinePOS-api';
import { MovieDetailGetInfoSuccess } from '../../../api/cinePOS-api/model/movieDetailGetInfoSuccess';


@Injectable({
  providedIn: 'root'
})
export class MoviePageService {

  constructor(
    private managerService: ManagerService,
  ) { }

  v1ManagerMovieIdGet(id: string): Observable<MovieDetailGetInfoSuccess> {
    return this.managerService.v1ManagerMovieIdGet(id)
      .pipe(
        tap(res => res.code !== 1 && alert(res.message)),
        filter(res => res.code === 1)
      )
  }
}
