import { MoviePageService } from './../services/movie-page.service';
import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StorageEnum } from 'projects/staff/src/app/core/enums/storage/storage-enum';
import { ProfileData } from 'projects/staff/src/app/core/interface/profile-data';
import { StorageService } from 'projects/staff/src/app/core/services/storage/storage.service';
import { MovieDetailCreateParameter, MovieDetailRes } from '../../../api/cinePOS-api';
import { CommonOptionSuccessDataItem } from '../../../api/cinePOS-api/model/commonOptionSuccessDataItem';
import { CommonAPIService } from '../../../core/services/common-api/common.service';
import { range } from 'rxjs';

@Component({
  selector: 'app-movie-detail-page',
  templateUrl: './movie-detail-page.component.html',
  styleUrls: ['./movie-detail-page.component.scss']
})

export class MovieDetailPageComponent implements OnInit, AfterViewInit {
  isEdit: boolean = false;                                                                  // 是否為編輯頁（true：是）
  formGroup!: FormGroup;

  /* API */
  movieInfoAPI!: MovieDetailRes;                                                            // API- 電影資訊
  genreOptions: CommonOptionSuccessDataItem[] = [];                                         // API- 選項：電影類型
  provideVersionOptions: CommonOptionSuccessDataItem[] = [];                                // API- 選項：提供設備
  rateOptions: CommonOptionSuccessDataItem[] = [];                                          // API- 選項：分級
  statusOptions: CommonOptionSuccessDataItem[] = [];                                        // API- 選項：狀態

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

  constructor(
    private _Route: ActivatedRoute,
    private _MoviePageService: MoviePageService,
    private _CommonAPIService: CommonAPIService,
    private _StorageService: StorageService,
    private _ChangeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.isEdit = (this._Route.snapshot?.url[1]?.path) === 'edit';
    console.log('isEdit', this.isEdit, this._Route.snapshot);

    this.login();                                              // 登入 (====之後串了真正登入要刪掉)
    this.getOptionAPI();                                       // API- 取得選項資料

    if (this.isEdit) {
      // 編輯狀態
      this.getMovieInfoAPI(this._Route.snapshot.params['id']); // API- 取得電影資訊

    } else {
      // 新增狀態
      this.addCast();
    };
  }

  ngAfterViewInit() {
    this._ChangeDetectorRef.detectChanges();
  }

  initForm(): void {
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
    });
  }



  // 帶回表單資料
  setForm(data: MovieDetailRes): void {
    if (this.isEdit) {
      this.formGroup.patchValue(data);
      (data.cast as string[]).forEach((item: string) => {
        this.cast.push(new FormControl(item));
      });
    };
    this._ChangeDetectorRef.detectChanges();
    console.log('formGroup- 帶值', this.formGroup);
  }



  // 主演- 新增
  addCast(): void {
    this.cast.push(new FormControl(""));
  }


  // 主演- 刪除
  removeCast(idx: number): void {
    this.cast.removeAt(idx);
  }



  // 上傳檔案- 選擇檔案
  onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('上傳檔案原始檔', file);

      this.postPosterAPI(file);
    };
  }



  // 共用- 錯誤訊息
  getErrorMsg(control: AbstractControl): string {
    let errorMsg = "";
    let error = control.errors;

    if (error && (control.touched || control.dirty)) {
      if (error['required']) {
        errorMsg = "此為必填欄位";
      } else if (error['pattern']) {
        errorMsg = "格式錯誤";
      };
    };

    return errorMsg;
  }



  // 送單- 整理參數
  getCreateMovieDetailPara(): MovieDetailCreateParameter {
    let para: MovieDetailCreateParameter = {
      id: this.id.value,
      title: this.title.value,
      enTitle: this.enTitle.value,
      genre: this.genre.value,
      runtime: this.runtime.value,
      provideVersion: this.provideVersion.value,
      rate: this.rate.value,
      director: this.director.value,
      cast: this.cast.value,
      description: this.description.value,
      status: this.status.value,
      releaseDate: this.releaseDate.value,
      trailerLink: this.trailerLink.value,
      distributor: this.distributor.value,
      posterUrl: this.posterUrl.value,
    };
    console.log('送單參數', para);

    return para;
  }



  // 送單
  submit(): void {
    console.log(this.formGroup);
    if (this.formGroup.valid) {
      let para = this.getCreateMovieDetailPara();                // 整理參數

      if (this.isEdit) {
        this.patchUpdateMovieDetailAPI(para);                    // API- 更新電影資訊
      } else {
        this.postCreateMovieDetailAPI(para);                     // API- 新增電影資訊
      };

    } else {
      this.formGroup.markAllAsTouched();
      alert("請填寫必填欄位");
    };
  }





  // ————————————————————————————————  API  ————————————————————————————————
  // API- 取得電影資訊
  getMovieInfoAPI(id: string): void {
    setTimeout(() => {
      this._MoviePageService.getMovieDetail(id).subscribe(res => {
        console.log(res)
        this.movieInfoAPI = res.data as MovieDetailRes;
        this._ChangeDetectorRef.detectChanges();

        this.setForm(this.movieInfoAPI);
      });
    });
  }



  // API- 上傳海報
  postPosterAPI(file: Blob): void {
    const formData = new FormData();
    formData.append('upload', file);

    this._CommonAPIService.upload(file, "file").subscribe(res => {
      console.log('上傳檔案成功response', res);
      this.posterUrl.setValue(res.data?.fileUrl);
    });
  }



  // API- 新增電影資訊
  postCreateMovieDetailAPI(para: MovieDetailCreateParameter): void {
    this._MoviePageService.createMovieDetail(para).subscribe(res => {
      console.log('新增電影資訊-成功res', res);
      alert(res.message);
    });
  }


  // API- 更新電影資訊
  patchUpdateMovieDetailAPI(para: MovieDetailCreateParameter): void {
    this._MoviePageService.updateMovieDetail(para).subscribe(res => {
      console.log('更新電影資訊-成功res', res);
      alert(res.message);
    });
  }



  // API- 取得選項資料
  getOptionAPI(): void {
    range(1, 4).subscribe(typeId => {
      this._CommonAPIService.getOption(typeId).subscribe(res => {
        console.log(typeId, '取得選項資料-成功res', res);
        switch (typeId) {
          case 1: this.genreOptions = res.data as CommonOptionSuccessDataItem[]; break;
          case 2: this.provideVersionOptions = res.data as CommonOptionSuccessDataItem[]; break;
          case 3: this.rateOptions = res.data as CommonOptionSuccessDataItem[]; break;
          case 4: this.statusOptions = res.data as CommonOptionSuccessDataItem[]; break;
          default: break;
        };
        this._ChangeDetectorRef.detectChanges();
      });
    });
  }



  // 登入
  login(): void {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDRmMGE5OTc3ZmRlZThmYTBiYzc1YSIsInN0YWZmSWQiOiJCMDAwMSIsImlhdCI6MTY4NDY1Njk2NSwiZXhwIjoxNjg0OTE2MTY1fQ.F0wkHVM6fZq-VXWP7S3ngUwM6yHswjD1IPP5S9Uu7B4";
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
