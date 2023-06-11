import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonOptionSuccessDataItem } from '../../../api/cinePOS-api';
import { CommonAPIService } from '../../../core/services/common-api/common.service';
import { Step } from './step/enums/step';

type ACTION_CONFIG = 'next' | 'back' | 'finish';


@Component({
  selector: 'app-theater-detail-page',
  templateUrl: './theater-detail-page.component.html',
  styleUrls: ['./theater-detail-page.component.scss']
})
export class TheaterDetailPageComponent implements OnInit {

  formGroup!: FormGroup;

  /* API */
  typeOptions: CommonOptionSuccessDataItem[] = [];

  /* 表單取值 */
  get theaterName() { return this.formGroup.get('theaterName') as FormControl; }        // 影廳名稱
  get theaterFloor() { return this.formGroup.get('theaterFloor') as FormControl; }        // 影廳樓層
  get theaterType() { return this.formGroup.get('theaterType') as FormControl; }        // 影廳類型
  get row() { return this.formGroup.get('row') as FormControl; }        // 直排格數
  get col() { return this.formGroup.get('col') as FormControl; }        // 橫排格數
  get rowType() { return this.formGroup.get('rowType') as FormControl; }        // row是英文還數字

  constructor(
    private commonAPIService: CommonAPIService,
    private changeDetectorRef: ChangeDetectorRef,
    private fb :FormBuilder
  ) { }

  ngOnInit(): void {

    this.initForm();

    //取得影廳類型資料
    this.getOptionAPI(2);

    //default: row是英文
    this.formGroup.get('rowType')?.setValue(1);
  }

  handleChange(event:any) {

  }


  // 查詢- 初始化表單
  initForm() {
    this.formGroup = this.fb.group({
      theaterName: new FormControl(""),
      theaterFloor: new FormControl(""),
      theaterType: new FormControl(""),
      row:  ['', [Validators.required, Validators.pattern('[0-9]*')]],
      col:  ['', [Validators.required, Validators.pattern('[0-9]*')]],
      rowType: new FormControl(true)
    });
  }

  rows: number = 0;
  cols: number = 0;
  name: string = "";
  floor: number = 0;
  equipment: string = "";
  equipmentOption: number = 0;
  type: boolean = true;
  isVisible = false;
  createMap(): void {
    const rows = this.formGroup.get('rows')?.value;
    const cols = this.formGroup.get('cols')?.value;

    if (rows > 0 && cols > 0) {
      this.isVisible = true;
    } else {
      this.isVisible = false;
    }
  }

  onPositiveClick(action: ACTION_CONFIG) {
    switch (action) {
      case 'next':
        this.nextStep();
        break;
      case 'back':
        this.lastStep();
        break;
      default:
        break;
    }
  }

  step: Step = Step.createMap; // 步驟順序
  nextStep(): void {
    switch (this.step) {
      case Step.createMap:
        this.step++;
        this.formGroup.disable();
        break;
      case Step.seatMapSetting:
        this.step++;
        break;
      case Step.seatTypeSetting:
        this.step++;
        break;
      case Step.finish:
        break;
      default:
        break;
    }
  }

  lastStep(): void {
    switch (this.step) {
      case Step.createMap:
        break;
      case Step.seatMapSetting:
        this.formGroup.enable();
        this.step--;
        break;
      case Step.seatTypeSetting:
        this.step--;
        break;
      case Step.finish:
        this.step--;
        break;
      default:
        break;
    }


    // if (this.step != 1) {
    //   this.step--;
    // }

    // // 若沒有按產生座位表，要把上一次輸入的值洗掉
    // // TODO: 輸入框的值不知道為什麼洗不掉ＱＱ
    // this.formGroup.get('theaterFloor')?.setValue(this.floor);
    // this.formGroup.get('theaterType')?.setValue(this.equipmentOption);
    // this.formGroup.get('rowType')?.setValue(this.type);
    // this.formGroup.get('row')?.setValue(this.rows);
  }

  selectedText = "";
  handleOptionSelected(item: any) {
    this.selectedText = item?.name;
  }

  getSeatMapResult(result: any): void {
    // 在這裡處理回傳的 responseArr
    this.seatMap = result.seatMap;
    this.rowLabel = result.rowLabel;
    this.colLabel = result.colLabel;
  }

  seatMap: string[] = [];
  rowLabel: string[] = [];
  colLabel: string[] = [];

  finish(): void {
    console.log("=== get result ===");
    console.log(this.seatMap);
    console.log(this.rowLabel);
    console.log(this.colLabel);
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
}
