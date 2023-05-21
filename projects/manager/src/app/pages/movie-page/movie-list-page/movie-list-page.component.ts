import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviePageService } from '../services/movie-page.service';
import { StorageService } from '../../../core/services/storage/storage.service';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonOptionSuccessDataItem } from '../../../api/cinePOS-api';

@Component({
  selector: 'app-movie-list-page',
  templateUrl: './movie-list-page.component.html',
  styleUrls: ['./movie-list-page.component.scss']
})
export class MovieListPageComponent implements OnInit {
  formGroup!: FormGroup;

  /* API */
  statusOptions: CommonOptionSuccessDataItem[] = [];                                        // API- 選項：狀態

  /* 表單取值 */
  get status() { return this.formGroup.get('status') as FormControl; }                      // 上映狀態
  get searchDateS() { return this.formGroup.get('searchDateS') as FormControl; }            // 查詢起始日
  get searchDateE() { return this.formGroup.get('searchDateE') as FormControl; }            // 查詢結束日
  get title() { return this.formGroup.get('title') as FormControl; }                        // 電影名稱

  constructor(
    private _Route: ActivatedRoute,
    private _MoviePageService: MoviePageService,
    private _StorageService: StorageService,
    private _ChangeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getOptionAPI();                                                                    // API- 取得選項資料
  }


  initForm() {
    this.formGroup = new FormGroup({
      status: new FormControl(null),
      searchDateS: new FormControl(""),
      searchDateE: new FormControl(""),
      title: new FormControl(""),
    });
  }





  // ————————————————————————————————  API  ————————————————————————————————
  // API- 取得選項資料
  getOptionAPI() {
    this.statusOptions = [
      { name: '已下線', value: -1 },
      { name: '籌被中', value: 0 },
      { name: '上映中', value: 1 },
    ];

    this._ChangeDetectorRef.detectChanges();
  }

}
