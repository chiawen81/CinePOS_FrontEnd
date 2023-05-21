import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviePageService } from '../services/movie-page.service';
import { StorageService } from '../../../core/services/storage/storage.service';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonOptionSuccessDataItem } from '../../../api/cinePOS-api';
import { CinePageSet } from '../../../share/pagination/page-set';
import { CommonAPIService } from '../../../core/services/common-api/common.service';
import { MOVIE_LIST } from '../movie-list';

@Component({
  selector: 'app-movie-list-page',
  templateUrl: './movie-list-page.component.html',
  styleUrls: ['./movie-list-page.component.scss']
})
export class MovieListPageComponent implements OnInit {
  formGroup!: FormGroup;

  sampleList: any[] = MOVIE_LIST;
  displayList: any[] = MOVIE_LIST;
  pageSet1 = new CinePageSet();

  /* API */
  statusOptions: CommonOptionSuccessDataItem[] = [];                                        // API- 選項：狀態

  /* 表單取值 */
  get status() { return this.formGroup.get('status') as FormControl; }                      // 上映狀態
  get searchDateS() { return this.formGroup.get('searchDateS') as FormControl; }            // 查詢起始日
  get searchDateE() { return this.formGroup.get('searchDateE') as FormControl; }            // 查詢結束日
  get title() { return this.formGroup.get('title') as FormControl; }                        // 電影名稱

  constructor(
    private _Route: ActivatedRoute,
    private _StorageService: StorageService,
    private _MoviePageService: MoviePageService,
    private _CommonAPIService: CommonAPIService,
    private _ChangeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getOptionAPI(4);                                                                   // API- 取得選項資料

    this.pageSet1.initialize(this.sampleList.length);


    // DEMO 才前端切
    this.displayList = this.pageSet1.slicePage(this.sampleList, this.pageSet1.currentPage, this.pageSet1.currentPageSize);
    this._ChangeDetectorRef.detectChanges();

  }


  initForm() {
    this.formGroup = new FormGroup({
      status: new FormControl(null),
      searchDateS: new FormControl(""),
      searchDateE: new FormControl(""),
      title: new FormControl(""),
    });
  }


  handlePageEvent($event: any) {
    console.log($event);
    this.pageSet1.currentPage = $event.pageIndex + 1;
    this.displayList = this.pageSet1.slicePage(this.sampleList, this.pageSet1.currentPage, this.pageSet1.currentPageSize);

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

}
