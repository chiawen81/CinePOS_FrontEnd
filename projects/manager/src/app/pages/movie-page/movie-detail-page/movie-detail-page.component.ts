import { HttpClient } from '@angular/common/http';
import { MoviePageService } from './../services/movie-page.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StorageEnum } from 'projects/staff/src/app/core/enums/storage/storage-enum';
import { ProfileData } from 'projects/staff/src/app/core/interface/profile-data';
import { StorageService } from 'projects/staff/src/app/core/services/storage/storage.service';
import { StaffService } from '../../../api/cinePOS-api';

@Component({
  selector: 'app-movie-detail-page',
  templateUrl: './movie-detail-page.component.html',
  styleUrls: ['./movie-detail-page.component.scss']
})

export class MovieDetailPageComponent implements OnInit, AfterViewInit {
  isEdit: boolean = false;                                                                  // 是否為編輯頁（true：是）
  formGroup!: FormGroup;

  /* API */
  movieInfoAPI: any;                                                                        // API- 電影資訊
  rateOptions: any;                                                                         // API- 選項：分級
  genreOptions: any;                                                                        // API- 選項：電影類型
  provideVersionOptions: any;                                                               // API- 選項：提供設備

  /* 表單取值 */
  get id() { return this.formGroup.get('id') as FormControl; }                              // 電影ID
  get title() { return this.formGroup.get('title') as FormControl; }                        // 電影名稱
  get enTitle() { return this.formGroup.get('enTitle') as FormControl; }                    // 電影英文名稱
  get genre() { return this.formGroup.get('genre') as FormControl; }                        // 電影類型
  get runtime() { return this.formGroup.get('runtime') as FormControl; }                    // 片長
  get provideVersion() { return this.formGroup.get('provideVersion') as FormControl; }      // 版本
  get rate() { return this.formGroup.get('rate') as FormControl; }                          // 分級
  get director() { return this.formGroup.get('director') as FormControl; }                  // 導演
  get cast() { return this.formGroup.get('cast') as FormArray; }                            // 演員
  get description() { return this.formGroup.get('description') as FormControl; }            // 電影描述
  get status() { return this.formGroup.get('status') as FormControl; }                      // 狀態
  get releaseDate() { return this.formGroup.get('releaseDate') as FormControl; }            // 上映日期
  get trailerLink() { return this.formGroup.get('trailerLink') as FormControl; }            // 預告片連結
  get distributor() { return this.formGroup.get('distributor') as FormControl; }            // 發行商
  get posterUrl() { return this.formGroup.get('posterUrl') as FormControl; }                // 海報連結
  get file() { return this.formGroup.get('file') as FormControl; }                          // 海報檔案
  get fileSource() { return this.formGroup.get('fileSource') as FormControl; }              // 海報檔案（暫存）


  constructor(
    private _Route: ActivatedRoute,
    private _MoviePageService: MoviePageService,
    private _StaffService: StaffService,
    private _StorageService: StorageService,
    private _Http: HttpClient,
    private _ChangeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.isEdit = (this._Route.snapshot?.url[1]?.path) === 'edit';
    this.login();
    setTimeout(() => {
      if (this.isEdit) {
        this.getMovieInfoAPI(this._Route.snapshot.params['id']); // API- 取得電影資訊

      } else {
        this.addCast();
      };
      this.getOptionAPI();                                    // API- 取得選項資料
    });

    console.log('isEdit', this.isEdit, this._Route.snapshot);
  }

  ngAfterViewInit() {


    this._ChangeDetectorRef.detectChanges();
  }

  initForm() {
    this.formGroup = new FormGroup({
      id: new FormControl("", [Validators.required]),
      title: new FormControl("", [Validators.required]),
      enTitle: new FormControl("", [Validators.pattern(/^[a-zA-Z0-9\s]*$/)]),
      genre: new FormControl(null, [Validators.required]),
      runtime: new FormControl(null, [Validators.required]),
      provideVersion: new FormControl(null, [Validators.required]),
      rate: new FormControl(null, [Validators.required]),
      director: new FormControl(""),
      cast: new FormArray([]),
      description: new FormControl("", [Validators.maxLength(300)]),
      status: new FormControl(0, [Validators.required]),
      releaseDate: new FormControl(null, [Validators.required]),
      trailerLink: new FormControl("", [Validators.pattern(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/)]),
      distributor: new FormControl("",),
      posterUrl: new FormControl("", [Validators.required]),
      file: new FormControl(null),
      fileSource: new FormControl('', [Validators.required])
    });
  }



  // 帶回表單資料
  setForm(data: any) {
    if (this.isEdit) {
      this.formGroup.patchValue(data);
      data.cast.forEach((item: string) => {
        this.cast.push(new FormControl(item));
      });
    };
    this._ChangeDetectorRef.detectChanges();
    console.log('formGroup- 帶值', this.formGroup);
  }



  // 主演- 新增
  addCast() {
    this.cast.push(new FormControl(""));
  }


  // 主演- 刪除
  removeCast(idx: number) {
    this.cast.removeAt(idx);
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formGroup.patchValue({
        fileSource: file
      });
    }
  }

  submit() {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDRlYzMxOTc3ZmRlZThmYTBiYzc1NyIsInN0YWZmSWQiOiJBMDAwMSIsImlhdCI6MTY4NDA2MzY5MywiZXhwIjoxNjg0MzIyODkzfQ.UEtXscjKI8S2vrKJvbcEJBAr07t7KSV1McqAWt1lePo";
    this._StorageService.setLocalStorage(StorageEnum.token, token);
    const profileData: ProfileData = {
      name: "文文編輯頁測試",
      staffId: "A0001",
      imgUrl: 'assets/images/angular-icon.webp'
    }
    this._StorageService.setLocalStorage(StorageEnum.profileData, profileData);

    const formData = new FormData();
    formData.append('image', this.fileSource.value);
    console.log('formData', formData);
    console.log('file', this.file.value)
    console.log('fileSource', this.fileSource.value)
    this._StaffService.v1StaffUserProfileStaffIdPostForm(this.fileSource.value, "A0001").subscribe(res => {
      console.log(res);
    })
  }


  // 共用- 錯誤訊息
  getErrorMsg(control: AbstractControl) {
    let errorMsg = "";
    let error = control.errors;

    if (error) {
      if (error['required']) {
        errorMsg = "此為必填欄位";
      } else if (error['pattern']) {
        errorMsg = "格式錯誤";
      };
    };

    return errorMsg;
  }


  // ————————————————————————————————  API  ————————————————————————————————
  // API- 取得電影資訊
  getMovieInfoAPI(id: string) {
    this._MoviePageService.v1ManagerMovieIdGet(id).subscribe(res => {
      console.log(res)
      this.movieInfoAPI = res.data;
      this.setForm(this.movieInfoAPI);
    });
  }



  // API- 取得選項資料
  getOptionAPI() {
    this.genreOptions = [
      { name: '動作', value: 1 },
      { name: '冒險', value: 2 },
      { name: '喜劇', value: 3 },
      { name: '劇情', value: 4 },
      { name: '恐怖', value: 5 },
      { name: '科幻', value: 6 },
      { name: '浪漫愛情', value: 7 },
      { name: '動畫', value: 8 },
      { name: '紀錄片', value: 9 },
      { name: '音樂', value: 10 },
      { name: '懸疑', value: 11 },
      { name: '驚悚', value: 12 },
      { name: '犯罪', value: 13 },
    ];

    this.provideVersionOptions = [
      { name: '2D', value: 1 },
      { name: '3D', value: 2 },
      { name: 'IMAX', value: 3 },
      { name: '4DX', value: 4 },
    ];

    this.rateOptions = [
      { name: '普通級', value: 0 },
      { name: '保護級', value: 6 },
      { name: '輔12', value: 12 },
      { name: '輔15', value: 15 },
      { name: '限制級', value: 18 },
    ];

    this._ChangeDetectorRef.detectChanges();
  }


  login() {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDRmMGE5OTc3ZmRlZThmYTBiYzc1YSIsInN0YWZmSWQiOiJCMDAwMSIsImlhdCI6MTY4NDA1MTEyNiwiZXhwIjoxNjg0MzEwMzI2fQ.LTT8tH9va3GaO8o7K1u9ekAOYoKYWWWTEEigN32ziOg";
    this._StorageService.setLocalStorage(StorageEnum.token, token);
    const profileData: ProfileData = {
      name: "文文編輯頁測試",
      staffId: "B0001",
      imgUrl: 'assets/images/angular-icon.webp'
    }
    this._StorageService.setLocalStorage(StorageEnum.profileData, profileData);
  }

  getFormConsole() {
    console.log('formGroup- 取值', this.formGroup);
  }
}
