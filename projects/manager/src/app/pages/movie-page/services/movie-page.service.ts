import { Injectable } from '@angular/core';
import { filter, Observable, tap } from 'rxjs';
import { ManagerService, MovieDetailCreateParameter, MovieDetailCreateSuccess, } from '../../../api/cinePOS-api';
import { MovieDetailGetInfoSuccess } from '../../../api/cinePOS-api/model/movieDetailGetInfoSuccess';
import { MovieDetailUpdateSuccess } from '../../../api/cinePOS-api/model/movieDetailUpdateSuccess';
import { CommonUploadSuccess } from '../../../api/cinePOS-api/model/commonUploadSuccess';
import { ManagerMovieListSuccess } from '../../../api/cinePOS-api/model/managerMovieListSuccess';
import { MovieDetailUpdateParameter } from '../../../api/cinePOS-api/model/movieDetailUpdateParameter';
import { MovieDetailCreateParameterCustomer } from '../../../core/interface/movie';
import { StorageService } from '../../../core/services/storage/storage.service';
import { ProfileData } from 'projects/staff/src/app/core/interface/profile-data';
import { StorageEnum } from '../../../core/enums/storage/storage-enum';


@Injectable({
  providedIn: 'root'
})
export class MoviePageService {

  constructor(
    private _ManagerService: ManagerService,
    private _StorageService: StorageService,
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
  updateMovieDetail(para: MovieDetailUpdateParameter): Observable<MovieDetailUpdateSuccess> {
    return this._ManagerService.v1ManagerMoviePatch(para)
      .pipe(
        tap(res => res.code !== 1 && alert(res.message)),
        filter(res => res.code === 1)
      )
  }


}
