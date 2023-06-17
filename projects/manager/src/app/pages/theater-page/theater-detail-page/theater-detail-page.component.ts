import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonOptionSuccessDataItem } from '../../../api/cinePOS-api';
import { CommonAPIService } from '../../../core/services/common-api/common.service';
import { TheaterService } from './../services/theater.service';
import { Step } from './step/enums/step';
import { Step2Component } from './step/components/step2/step2.component';
import { SeatSettingType } from '../../../features/manager-seatchart/enums/seat-setting.enum';
import { Router } from '@angular/router';
import { STATIC_ROUTES } from '../../../core/constant/routes.constant';

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
    private theaterService: TheaterService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.initForm();

    //取得影廳類型資料
    this.getOptionAPI(2);

    //default: row是英文
    this.formGroup.get('rowType')?.setValue(1);
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
      case 'finish':
        this.finish();
        break;
      default:
        break;
    }
  }

  step: Step = Step.createMap; // 步驟順序
  nextStep(): void {
    switch (this.step) {
      case Step.createMap:
        if(this.formGroup.invalid){
          return;
        }
        this.step++;
        const row = this.formGroup.get('row')?.value;
        const col = this.formGroup.get('col')?.value;
        const rowType = this.formGroup.get('rowType')?.value;
        this.step2?.seatChartGenerator(col, row, rowType);
        this.step2?.setSeatSettingType(SeatSettingType.showOrNot);
        this.formGroup.disable();
        break;
      case Step.seatMapSetting:
        this.step2?.setSeatSettingType(SeatSettingType.disable);
        this.step++;
        break;
      case Step.rank:
        this.step2?.setSeatSettingType(SeatSettingType.seatType);
        this.step++;
        break;
      case Step.seatTypeSetting:
        this.step2?.setSeatSettingType(SeatSettingType.disable);
        break;
      default:
        break;
    }
  }

  lastStep(): void {
    this.step--;

    switch (this.step) {
      case Step.createMap:
        this.formGroup.enable();
        this.step2?.setSeatSettingType(SeatSettingType.disable);
        break;
      case Step.seatMapSetting:
        this.step2?.setSeatSettingType(SeatSettingType.showOrNot);
        break;
      case Step.rank:
        this.step2?.setSeatSettingType(SeatSettingType.disable);
        break;
      case Step.seatTypeSetting:
        this.step2?.setSeatSettingType(SeatSettingType.seatType);
        break;
      default:
        break;
    }
  }

  selectedText = "";
  handleOptionSelected(item: any) {
    this.selectedText = item?.name;
  }

  seatMap: string[] = [];
  rowLabel: string[] = [];
  colLabel: string[] = [];

  getSeatMapResult(result: any): void {
    // 在這裡處理回傳的 responseArr
    this.seatMap = result.seatMap;
    this.rowLabel = result.rowLabel;
    this.colLabel = result.colLabel;
  }

  finish(): void {
    console.log("=== get result ===");
    const formValue = this.formGroup.getRawValue();
    console.log(formValue);
    console.log(formValue.step2.rowLabel);
    console.log(formValue.step2.colLabel);

    let totalCapacity: number = 0;
    let wheelChairCapacity: number = 0;
    for (const seatItem of formValue.step2.seatMap) {
      if(seatItem != "N"){
        totalCapacity++;
      }

      if(seatItem === "1"){
        wheelChairCapacity++;
      }
    }

    let para: any = {
      name: formValue.theaterName,
      type: formValue.theaterType,
      floor: formValue.theaterFloor,
      totalCapacity: totalCapacity,
      wheelChairCapacity: wheelChairCapacity,
      row: formValue.row,
      col: formValue.col,
      rowLabel: formValue.step2.rowLabel,
      colLabel: formValue.step2.colLabel,
      seatMap: formValue.step2.seatMap,
      status: 0
    };
    
    this.theaterService.createTheater(para).subscribe(res => {
      console.log('新增影廳資訊-成功res', res);
      this.router.navigate([STATIC_ROUTES.THEATER, res.data.theater._id]);
      alert(res.message);
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
}
