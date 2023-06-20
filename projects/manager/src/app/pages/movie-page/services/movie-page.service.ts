import { Injectable } from '@angular/core';
import { filter, Observable, tap } from 'rxjs';
import { MovieDetailGetInfoSuccess } from '../../../api/cinePOS-api/model/movieDetailGetInfoSuccess';
import { ManagerMovieListSuccess } from '../../../api/cinePOS-api/model/managerMovieListSuccess';
import { MovieDetailUpdateParameter } from '../../../api/cinePOS-api/model/movieDetailUpdateParameter';
import { MovieDetailCreateParameterCustomer, MovieDetailUpdateSuccessCustomer } from '../../../core/interface/movie';
import { ManagerService } from '../../../api/cinePOS-api/api/manager.service';
import { MovieDetailCreateSuccess } from '../../../api/cinePOS-api/model/movieDetailCreateSuccess';
import { MovieDetailCreateParameter } from '../../../api/cinePOS-api/model/movieDetailCreateParameter';
import { MovieDetailDeleteSuccess } from '../../../api/cinePOS-api/model/movieDetailDeleteSuccess';
import { MovieStatusPara } from '../../../api/cinePOS-api/model/movieStatusPara';

@Injectable({
  providedIn: 'root'
})

export class MoviePageService {

  constructor(
    private _ManagerService: ManagerService
  ) { }

  // 更新電影資訊
  getMovieList(status: number, searchDateS: string, searchDateE: string, title: string): Observable<ManagerMovieListSuccess> {
    return this._ManagerService.v1ManagerMovieListGet(status, searchDateS, searchDateE, title)
      .pipe(
        tap(res => res.code !== 1 && alert(res.message)),
        filter(res => res.code === 1)
      )
  }


  // 取得電影資訊
  getMovieDetail(id: string): Observable<MovieDetailGetInfoSuccess> {
    return this._ManagerService.v1ManagerMovieIdGet(id)
      .pipe(
        tap(res => res.code !== 1 && alert(res.message)),
        filter(res => res.code === 1)
      )
  }


  // 新增電影資訊
  createMovieDetail(para: MovieDetailCreateParameterCustomer): Observable<MovieDetailCreateSuccess> {
    return this._ManagerService.v1ManagerMoviePost(para as MovieDetailCreateParameter)
      .pipe(
        tap(res => res.code !== 1 && alert(res.message)),
        filter(res => res.code === 1)
      )
  }


  // 更新電影資訊
  updateMovieDetail(para: MovieDetailUpdateParameter): Observable<MovieDetailUpdateSuccessCustomer> {
    return (this._ManagerService.v1ManagerMoviePatch(para) as Observable<MovieDetailUpdateSuccessCustomer>)
      .pipe(
        tap(res => res.code !== 1 && alert(res.message)),
        filter(res => res.code === 1)
      )
  }



  // 更新電影上映狀態
  updateReleaseStatus(para: MovieStatusPara): Observable<MovieDetailDeleteSuccess> {
    return this._ManagerService.v1ManagerMovieStatusPut(para)
      .pipe(
        tap(res => res.code !== 1 && alert(res.message)),
        filter(res => res.code === 1)
      )
  }



  // 刪除電影
  deleteMovie(movieId: string): Observable<MovieDetailDeleteSuccess> {
    return this._ManagerService.v1ManagerMovieIdDelete(movieId)
      .pipe(
        tap(res => res.code !== 1 && alert(res.message)),
        filter(res => res.code === 1)
      )
  }

}
