import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviePageService } from '../services/movie-page.service';
import { StorageService } from '../../../core/services/storage/storage.service';
import { MovieDetailRes } from '../../../api/cinePOS-api';
import { StorageEnum } from '../../../core/enums/storage/storage-enum';
import { ProfileData } from 'projects/staff/src/app/core/interface/profile-data';

@Component({
  selector: 'app-movie-view-page',
  templateUrl: './movie-view-page.component.html',
  styleUrls: ['./movie-view-page.component.scss']
})

export class MovieViewPageComponent implements OnInit {
  movieInfoAPI!: MovieDetailRes;                                                              // API- 電影資訊
  movieId!: string;                                                                            // 電影ID

  constructor(
    private _Route: ActivatedRoute,
    private _MoviePageService: MoviePageService,
    private _StorageService: StorageService,
    private _ChangeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.movieId = this._Route.snapshot?.params['id'];
    console.log('movieId', this.movieId);
    this.login();                                              // 登入 (====之後串了真正登入要刪掉)
    this.getMovieInfoAPI(this.movieId);                        // API- 取得電影資訊
  }



  // ————————————————————————————————  API  ————————————————————————————————
  // API- 取得電影資訊
  getMovieInfoAPI(id: string) {
    setTimeout(() => {
      this._MoviePageService.getMovieDetail(id).subscribe(res => {
        console.log(res)
        this.movieInfoAPI = res.data as MovieDetailRes;
        this._ChangeDetectorRef.detectChanges();
      });
    });
  }


  // 登入
  login() {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDRmMGE5OTc3ZmRlZThmYTBiYzc1YSIsInN0YWZmSWQiOiJCMDAwMSIsImlhdCI6MTY4NDA1MTEyNiwiZXhwIjoxNjg0MzEwMzI2fQ.LTT8tH9va3GaO8o7K1u9ekAOYoKYWWWTEEigN32ziOg";
    this._StorageService.setLocalStorage(StorageEnum.token, token);
    const profileData: ProfileData = {
      name: "文文檢視頁測試",
      staffId: "B0001",
      imgUrl: 'assets/images/angular-icon.webp'
    }
    this._StorageService.setLocalStorage(StorageEnum.profileData, profileData);
  }

}
