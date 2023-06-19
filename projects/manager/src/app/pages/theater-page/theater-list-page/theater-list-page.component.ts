import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TheaterService } from './../services/theater.service';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonOptionSuccessDataItem } from '../../../api/cinePOS-api';
import { CinePageSet } from '../../../share/pagination/page-set';
import { CommonAPIService } from '../../../core/services/common-api/common.service';
import { Router } from '@angular/router';
import { STATIC_ROUTES } from '../../../core/constant/routes.constant';

@Component({
  selector: 'app-theater-list-page',
  templateUrl: './theater-list-page.component.html',
  styleUrls: ['./theater-list-page.component.scss']
})
export class TheaterListPageComponent implements OnInit {
  
  formGroup!: FormGroup;
  theaterListView: any[] = [];                           // 列表- 資料(顯示用)
  pageSet1 = new CinePageSet();

  /* API */
  typeOptions: CommonOptionSuccessDataItem[] = []; 
  theaterListApiData: any[] = [];                // API- 影廳列表(原始資料)  
  dialog: any;

  /* 表單取值 */
  get theaterName() { return this.formGroup.get('theaterName') as FormControl; }            // 影廳名稱
  get floor() { return this.formGroup.get('floor') as FormControl; }                        // 樓層
  get theaterType() { return this.formGroup.get('theaterType') as FormControl; }            // 影廳類型
  get capacityFrom() { return this.formGroup.get('capacityFrom') as FormControl; }          // 座位數量起 (起迄寫反沒差，後端有處理)
  get capacityTo() { return this.formGroup.get('capacityTo') as FormControl; }              // 座位數量迄
  get withDisabled() { return this.formGroup.get('withDisabled') as FormControl; }          // 是否有殘障座位
  get status() { return this.formGroup.get('status') as FormControl; }                      // 發佈狀態

  constructor(
    private router: Router,
    private commonAPIService: CommonAPIService,
    private theaterService: TheaterService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    
    this.initForm();

    //取得影廳類型資料
    this.getOptionAPI(2);  

    this.search();
  }

  // 查詢- 初始化表單
  initForm() {
    this.formGroup = new FormGroup({
      theaterName:  new FormControl(""),
      floor: new FormControl(""),
      theaterType: new FormControl(""),
      capacityFrom: new FormControl(""),
      capacityTo: new FormControl(""),
      withDisabled: new FormControl(""),
      status: new FormControl(""),
    });
  }

  // 查詢
  search(): void {
    this.formGroup.setErrors(null);

    if (this.formGroup.valid) {
      let condition: any = this.getSearchCondition();
      this.getListAPI(condition);

    } else {
      this.formGroup.markAllAsTouched();
      alert("請檢查欄位是否正確填寫！");
    };
  }

  // 查詢- 取得條件
  getSearchCondition(): any {
    let condition: any = {
      name: this.theaterName?.value,
      floor: this.floor?.value,
      type: Array.isArray(this.theaterType.value) && this.theaterType.value.length > 0 ? this.theaterType.value.join(',') : '',
      capacityFrom: this.capacityFrom?.value && this.capacityFrom?.value != null ? this.capacityFrom?.value : '',
      capacityTo: this.capacityTo?.value && this.capacityTo?.value != null ? this.capacityTo?.value : '',
      withDisabled: this.withDisabled?.value,
      status: this.status?.value
    };

    return condition;
  }

  // ————————————————————————————————  前端  ————————————————————————————————
  // 影廳類型 下拉式選單 全選/全不選
  selectAll(): void {
    const allValues = this.typeOptions.map(option => option.value as number);
    this.formGroup.get('theaterType')?.setValue(allValues);
  }
  clearAll(): void {
    this.formGroup.get('theaterType')?.setValue([]);
  }

  // 樓層 下拉式選單 清除
  clearSelection(): void {
    this.formGroup.get('floor')?.setValue("");
  }

  // 切換頁碼
  handlePageEvent($event: any) {
    console.log($event);
    this.pageSet1.currentPage = $event.pageIndex + 1;
    this.theaterListView = this.pageSet1.slicePage(this.theaterListApiData, this.pageSet1.currentPage, this.pageSet1.currentPageSize);
    this.changeDetectorRef.detectChanges();
  }

  // 前往明細頁
  openDetailPage(_id: string | undefined) {
    this.router.navigate([STATIC_ROUTES.THEATER, _id]);
  }

  // 前往編輯頁
  openEditPage(_id: string | undefined) {
    this.router.navigate([STATIC_ROUTES.THEATER, STATIC_ROUTES.DETAIL, STATIC_ROUTES.EDIT , _id]);
  }

  // 刪除影廳
  deleteTheater(theaterId: string | undefined) {
    this.theaterService.deleteTheater((theaterId as string)).subscribe(res => {
      console.log('刪除影廳-成功res', res);
      alert("刪除影廳-成功");
      this.getListAPI(this.getSearchCondition());
    });
  }

  // 更新上架狀態
  updateStatus(isOnline: boolean, theaterId: string | undefined) {
    let status: number = isOnline ? 1 : 0;
    let id: string = theaterId as string;
    let para: any = {
      status: status,
    };

    this.theaterService.updateStatus( id, para).subscribe(res => {
      console.log('更新上架狀態-成功res', res);
      alert("更新上架狀態-成功");
      this.getListAPI(this.getSearchCondition());
    });
  }

  // ————————————————————————————————  API  ————————————————————————————————
  // API- 取得選項資料
  getOptionAPI(typeId: number): void {
    this.commonAPIService.getOption(typeId).subscribe(res => {
      console.log(typeId, '取得選項資料-成功res', res);
      this.typeOptions = res.data as CommonOptionSuccessDataItem[];
      this.changeDetectorRef.detectChanges();
    });
  }

  // API- 取得列表資料
  getListAPI(condition: any): void {

    this.theaterService.getTheaterList(condition.name, condition.floor, condition.type, condition.capacityFrom, condition.capacityTo, condition.withDisabled, condition.status).subscribe(res => {
      console.log('取得列表資料-成功res', res);
      this.theaterListApiData = res.data as any[];

      // 表格元件- 取得最新列表資料
      this.theaterListView = this.pageSet1.slicePage(this.theaterListApiData, this.pageSet1.currentPage, this.pageSet1.currentPageSize);

      // 表格元件- 更新頁碼
      this.pageSet1.initialize(this.theaterListApiData.length);
      this.changeDetectorRef.detectChanges();
    });
  }
}
