import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonOptionSuccessDataItem } from '../../../api/cinePOS-api';
import { CommonAPIService } from '../../../core/services/common-api/common.service';
import { Step } from './step/enums/step';
import { Step2Component } from './step/components/step2/step2.component';
import { SeatSettingType } from '../../../features/manager-seatchart/enums/seat-setting.enum';

type ACTION_CONFIG = 'next' | 'back' | 'finish';


@Component({
  selector: 'app-theater-detail-page',
  templateUrl: './theater-detail-page.component.html',
  styleUrls: ['./theater-detail-page.component.scss']
})
export class TheaterDetailPageComponent implements OnInit, AfterViewInit {
  @ViewChild(Step2Component) step2?: Step2Component;

  Step = Step;
  formGroup!: FormGroup;

  /* API */
  typeOptions: CommonOptionSuccessDataItem[] = [];

  row: number = 0;
  col: number = 0;
  type: boolean = true;

  constructor(
    private commonAPIService: CommonAPIService,
    private changeDetectorRef: ChangeDetectorRef,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.initForm();

    //取得影廳類型資料
    this.getOptionAPI(2);
  }

  ngAfterViewInit() {
    console.log(this.step2);

  }
  handleChange(event: any) {

  }

  // 查詢- 初始化表單
  initForm() {
    this.formGroup = this.fb.group({
      theaterName: ['', [Validators.required]],
      theaterFloor: ['', [Validators.required]],
      theaterType: ['', [Validators.required]],
      row: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      col: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      rowType: [true],
      step2: this.fb.group({})
    });
  }
  /**
   * 設定子表單
   * @param event 傳入值
   * @param fgName 'sampleSchedule' | 'applyQualify'
   */
  addForm(event: any, fgName: 'step2'): void {
    this.formGroup.setControl(fgName, event);
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
        // if(this.formGroup.invalid){
        //   return;
        // }
        this.step++;
        const row = this.formGroup.get('row')?.value;
        const col = this.formGroup.get('col')?.value;
        const rowType = this.formGroup.get('rowType')?.value;
        this.step2?.seatChartGenerator(col, row, rowType);
        this.step2?.setSeatSettingType(SeatSettingType.disable);
        this.formGroup.disable();
        break;
      case Step.rank:

        this.step2?.setSeatSettingType(SeatSettingType.showOrNot);
        this.step++;
        break;
      case Step.seatMapSetting:
        this.step2?.setSeatSettingType(SeatSettingType.seatType);
        this.step++;
        break;
      case Step.seatTypeSetting:
        this.step2?.setSeatSettingType(SeatSettingType.disable);
        this.step++;
        this.finish();
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
      case Step.rank:
        this.formGroup.enable();
        this.step--;
        break;
      case Step.seatMapSetting:
        this.step2?.setSeatSettingType(SeatSettingType.disable);
        this.step--;
        break;
      case Step.seatTypeSetting:
        this.step2?.setSeatSettingType(SeatSettingType.showOrNot);
        this.step--;
        break;
      case Step.finish:
        this.step2?.setSeatSettingType(SeatSettingType.seatType);
        this.step--;
        break;
      default:
        break;
    }
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
    const formValue = this.formGroup.getRawValue();
    console.log(formValue);
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
