import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MoviePageService } from '../services/movie-page.service';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonOptionSuccessDataItem } from '../../../api/cinePOS-api';
import { CinePageSet } from '../../../share/pagination/page-set';
import { CommonAPIService } from '../../../core/services/common-api/common.service';
import { ManagerMovieListPara, ManagerMovieListSuccessDataInnerCustomer } from '../../../core/interface/movie';


@Component({
  selector: 'app-movie-list-page',
  templateUrl: './movie-list-page.component.html',
  styleUrls: ['./movie-list-page.component.scss']
})
export class MovieListPageComponent implements OnInit {
  formGroup!: FormGroup;
  movieListView: ManagerMovieListSuccessDataInnerCustomer[] = [];                           // 列表- 資料(顯示用)
  pageSet1 = new CinePageSet();

  /* API */
  statusOptions: CommonOptionSuccessDataItem[] = [];                                        // API- 選項：狀態
  movieListOriginalApiData: ManagerMovieListSuccessDataInnerCustomer[] = [];                // API- 電影列表(原始資料)

  /* 表單取值 */
  get status() { return this.formGroup.get('status') as FormControl; }                      // 上映狀態
  get searchDateS() { return this.formGroup.get('searchDateS') as FormControl; }            // 查詢起始日
  get searchDateE() { return this.formGroup.get('searchDateE') as FormControl; }            // 查詢結束日
  get title() { return this.formGroup.get('title') as FormControl; }                        // 電影名稱

  constructor(
    private _MoviePageService: MoviePageService,
    private _CommonAPIService: CommonAPIService,
    private _ChangeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this._MoviePageService.login();                                                         // 登入 (====之後串了真正登入要刪掉)
    this.getOptionAPI(4);                                                                   // API- 取得選項資料
  }



  // 查詢- 初始化表單
  initForm() {
    this.formGroup = new FormGroup({
      status: new FormControl(null),
      searchDateS: new FormControl(""),
      searchDateE: new FormControl(""),
      title: new FormControl(""),
    });
  }



  // 查詢
  search(): void {
    this.formGroup.setErrors(null);
    this.dateRangeRequireValidator();           // 驗證- 日期區間
    this.dateRangeOrderValidator();             // 驗證- 起始日不可晚於迄日

    if (this.formGroup.valid) {
      let condition: ManagerMovieListPara = this.getSearchCondition();
      this.getListAPI(condition);

    } else {
      this.formGroup.markAllAsTouched();
      alert("請檢查欄位是否正確填寫！");
    };
  }



  // 查詢- 取得條件
  getSearchCondition(): ManagerMovieListPara {
    let condition: ManagerMovieListPara = {
      status: this.status?.value,
      searchDateS: this.searchDateS?.value,
      searchDateE: this.searchDateE?.value,
      title: this.title?.value,
    };

    return condition;
  }



  // 驗證- 日期區間
  dateRangeRequireValidator(): void {
    if ((this.searchDateS.value && !this.searchDateE.value) || (!this.searchDateS.value && this.searchDateE.value)) {
      this.formGroup.setErrors({ 'dateRangeRequire': "請完整填寫日期區間" });
    };
  }



  // 驗證- 起始日不可晚於迄日
  dateRangeOrderValidator(): void {
    if (this.searchDateS.value && this.searchDateE.value && (this.searchDateS.value > this.searchDateE.value)) {
      this.formGroup.setErrors({ 'dateRangeOrder': "起始日不可晚於結束日" });
    };
  }



  // 切換頁碼
  handlePageEvent($event: any) {
    console.log($event);
    this.pageSet1.currentPage = $event.pageIndex + 1;
    this.movieListView = this.pageSet1.slicePage(this.movieListOriginalApiData, this.pageSet1.currentPage, this.pageSet1.currentPageSize);
    this._ChangeDetectorRef.detectChanges();
  }





  // ————————————————————————————————  API  ————————————————————————————————
  // API- 取得選項資料
  getOptionAPI(typeId: number): void {
    this._CommonAPIService.getOption(typeId).subscribe(res => {
      console.log(typeId, '取得選項資料-成功res', res);
      this.statusOptions = res.data as CommonOptionSuccessDataItem[];
      this._ChangeDetectorRef.detectChanges();
    });
  }



  // API- 取得列表資料
  getListAPI(condition: ManagerMovieListPara): void {
    this._MoviePageService.getMovieList(condition.status, condition.searchDateS, condition.searchDateE, condition.title).subscribe(res => {
      console.log('取得列表資料-成功res', res);
      this.movieListOriginalApiData = res.data as ManagerMovieListSuccessDataInnerCustomer[];


      // 表格元件- 取得最新列表資料
      this.movieListView = this.pageSet1.slicePage(this.movieListOriginalApiData, this.pageSet1.currentPage, this.pageSet1.currentPageSize);

      // 表格元件- 更新頁碼
      this.pageSet1.initialize(this.movieListOriginalApiData.length);
      this._ChangeDetectorRef.detectChanges();
    });
  }



}
