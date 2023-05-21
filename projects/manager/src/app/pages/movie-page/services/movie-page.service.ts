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


  // 登入 ====待處理，暫時寫死====
  login(): void {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDRmMGE5OTc3ZmRlZThmYTBiYzc1YSIsInN0YWZmSWQiOiJCMDAwMSIsImlhdCI6MTY4NDY5NTMxOSwiZXhwIjoxNjg0OTU0NTE5fQ.4S6yzY0aQgMWFwQc6Y3fnMvzdvU5gxUroqgMD-08yzo";
    this._StorageService.setLocalStorage(StorageEnum.token, token);
    const profileData: ProfileData = {
      name: "文文編輯頁測試",
      staffId: "B0001",
      imgUrl: 'assets/images/angular-icon.webp'
    }
    this._StorageService.setLocalStorage(StorageEnum.profileData, profileData);
  }

}
