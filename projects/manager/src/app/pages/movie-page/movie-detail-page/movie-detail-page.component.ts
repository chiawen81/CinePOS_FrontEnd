import { MoviePageService } from './../services/movie-page.service';
import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StorageEnum } from 'projects/staff/src/app/core/enums/storage/storage-enum';
import { ProfileData } from 'projects/staff/src/app/core/interface/profile-data';
import { StorageService } from 'projects/staff/src/app/core/services/storage/storage.service';

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

  constructor(
    private _Route: ActivatedRoute,
    private _MoviePageService: MoviePageService,
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



  // 上傳檔案- 選擇檔案
  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('上傳檔案原始檔', file);

      this.postPosterAPI(file);
    };
  }



  // 共用- 錯誤訊息
  getErrorMsg(control: AbstractControl) {
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
  getCreateMovieDetailPara() {
    let para = {
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
  submit() {
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
  getMovieInfoAPI(id: string) {
    setTimeout(() => {
      this._MoviePageService.getMovieDetail(id).subscribe(res => {
        console.log(res)
        this.movieInfoAPI = res.data;
        this._ChangeDetectorRef.detectChanges();

        this.setForm(this.movieInfoAPI);
      });
    });
  }



  // API- 上傳檔案(暫時借用上傳大頭貼) ====待處理====
  postPosterAPI(file: Blob) {
    const formData = new FormData();
    formData.append('image', file);

    this._MoviePageService.uploadImage(file, "B0001").subscribe(res => {
      console.log('上傳檔案成功response', res);
      this.posterUrl.setValue(res.data?.stickerUrl);
    });
  }


  // API- 新增電影資訊
  postCreateMovieDetailAPI(para: any) {
    this._MoviePageService.createMovieDetail(para).subscribe(res => {
      console.log('新增電影資訊-成功res', res);
      alert(res.message);
    });
  }


  // API- 更新電影資訊
  patchUpdateMovieDetailAPI(para: any) {
    this._MoviePageService.updateMovieDetail(para).subscribe(res => {
      console.log('更新電影資訊-成功res', res);
      alert(res.message);
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
    this._ChangeDetectorRef.detectChanges();

    this.provideVersionOptions = [
      { name: '2D', value: 1 },
      { name: '3D', value: 2 },
      { name: 'IMAX', value: 3 },
      { name: '4DX', value: 4 },
    ];
    this._ChangeDetectorRef.detectChanges();

    this.rateOptions = [
      { name: '普通級', value: 0 },
      { name: '保護級', value: 6 },
      { name: '輔12', value: 12 },
      { name: '輔15', value: 15 },
      { name: '限制級', value: 18 },
    ];

    this._ChangeDetectorRef.detectChanges();
  }



  // 登入
  login() {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDRmMGE5OTc3ZmRlZThmYTBiYzc1YSIsInN0YWZmSWQiOiJCMDAwMSIsImlhdCI6MTY4NDY0NzMwMywiZXhwIjoxNjg0OTA2NTAzfQ.6Iv6V2vSUKHS9NJHCInQFDQ9kxTmlN3b9w0zse44Z9U";
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
