import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonOptionSuccessDataItem } from '../../../api/cinePOS-api';
import { CommonAPIService } from '../../../core/services/common-api/common.service';
import { TheaterService } from './../services/theater.service';
import { Step } from './step/enums/step';
import { Step2Component } from './step/components/step2/step2.component';
import { SeatSettingType } from '../../../features/manager-seatchart/enums/seat-setting.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { STATIC_ROUTES } from '../../../core/constant/routes.constant';

type ACTION_CONFIG = 'next' | 'back' | 'finish';


@Component({
  selector: 'app-theater-detail-page',
  templateUrl: './theater-detail-page.component.html',
  styleUrls: ['./theater-detail-page.component.scss']
})
export class TheaterDetailPageComponent implements OnInit, AfterViewInit {
  @ViewChild(Step2Component) step2?: Step2Component;

  isEdit: boolean = false;
  Step = Step;
  formGroup!: FormGroup;
  theaterId: string = "";
  hintText: string = "";
  btnText: string = "產生座位圖";

  /* API */
  typeOptions: CommonOptionSuccessDataItem[] = [];

  row: number = 0;
  col: number = 0;
  type: boolean = true;

  constructor(
    private commonAPIService: CommonAPIService,
    private changeDetectorRef: ChangeDetectorRef,
    private theaterService: TheaterService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.initForm();
    this.isEdit = (this.route.snapshot?.url[1]?.path) === 'edit';
    console.log('isEdit', this.isEdit, this.route.snapshot);

    //取得影廳類型資料
    this.getOptionAPI(2);

    if (this.isEdit) {
      // 編輯狀態
      this.theaterId = this.route.snapshot.params['id'];
      this.getTheaterInfoAPI(); // API- 取得影廳資訊
      this.btnText = "修改基礎資訊";

      this.formGroup.controls['rowType'].disable();
      this.formGroup.controls['row'].disable();
      this.formGroup.controls['col'].disable();
    } else {
      // 新增狀態
      // default: row是英文
      this.formGroup.get('rowType')?.setValue(1);
    };
  }

  ngAfterViewInit() {
    console.log(this.step2);
    this.changeDetectorRef.detectChanges();
  }

  // 當row & col輸入為小數點時自動轉為整數
  inputRow!: number;
  inputCol!: number;
  inputName!: number;
  handleChange() {
    this.inputRow = Math.ceil(this.inputRow);
    this.inputCol = Math.ceil(this.inputCol);
    this.inputName = Math.ceil(this.inputName);
  }

  // 查詢- 初始化表單
  initForm() {
    this.formGroup = this.fb.group({
      theaterName: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      theaterFloor: ['', [Validators.required]],
      theaterType: ['', [Validators.required]],
      row: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      col: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      rowType: [true],
      step2: this.fb.group({})
    });
  }

  // 帶回表單資料
  setForm(data: any): void {
    if (this.isEdit) {
      // 直排排號判斷: true:英文, false:數字
      const rowType = this.parseTheaterType(data.rowLabel);
      const splitName = data.name.match(/\d+/)?.[0];
      const patchData = {
        theaterName: splitName,
        theaterFloor: data.floor,
        theaterType: data.type,
        row: data.row,
        col: data.col,
        rowType: rowType ? 1 : 0,
        step2: {
          seatMap: data.seatMap,
          rowLabel: data.rowLabel,
          colLabel: data.colLabel
        }
      };

      this.formGroup.patchValue(patchData);
    };
    this.changeDetectorRef.detectChanges();
    console.log('formGroup- 帶值', this.formGroup);
  }

  // 直排排號判斷: 暫時抓第rowLabel裡的資料來判斷
  parseTheaterType(data: any): boolean{
    
    const arr = data;

    // 篩選出英文字母
    const letters = arr.filter((item: string) => /[A-Za-z]/.test(item));
    // 篩選出數字
    const numbers = arr.filter((item: string) => /\d/.test(item));
    // 判斷英文字母數量是否比數字多
    const isMoreLetters = letters.length > numbers.length;
  
    return isMoreLetters;
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

  setHintText(){
    switch (this.step) {
      case 3:
        this.hintText = "※點選以設定特殊座位(ex:殘障座位)";
        break;
      case 2:
        this.hintText = "※根據實際情況調整直排、橫排的排號";
        break;
      case 1:
      default:
        this.hintText = "※點選以設定非座位區(ex:走道)";
        break;
    }
  }

  // 驗證
  inputValidator(key:string, min: number, max: number): boolean {
    
    let returnValue = true;
    switch(key){
      case "name":
          if (this.formGroup.get('theaterName')?.value < min) {
            returnValue = false;
          }
        break;
      case "row":
          if (this.formGroup.get('row')?.value < min || this.formGroup.get('row')?.value > max) {
            returnValue = false;
          }
        break;
      case "col":
          if (this.formGroup.get('col')?.value < min || this.formGroup.get('col')?.value > max) {
            returnValue = false;
          }
        break;
    }
    
    return returnValue;
  }

  step: Step = Step.createMap; // 步驟順序
  nextStep(): void {
    switch (this.step) {
      case Step.createMap:
        if(!this.inputValidator("name", 1, -1)){
          alert("影廳名稱須為1以上");
          return;
        }

        if(!this.inputValidator("row", 5, 26)){
          alert("直排格數須介於5~26之間");
          return;
        }

        if(!this.inputValidator("col", 5, 35)){
          alert("橫排格數須介於5~35之間");
          return;
        }

        if(this.formGroup.invalid){
          alert("請填寫所有欄位");
          return;
        }

        if (this.isEdit) {
          // 編輯狀態
          this.seatMap = this.formGroup.get('step2.seatMap')?.value;
          this.rowLabel = this.formGroup.get('step2.rowLabel')?.value;
          this.colLabel = this.formGroup.get('step2.colLabel')?.value;
          this.step2?.setSeatChart(this.seatMap, this.rowLabel, this.colLabel);
        } else {
          // 新增狀態
          const row = this.formGroup.get('row')?.value;
          const col = this.formGroup.get('col')?.value;
          const rowType = this.formGroup.get('rowType')?.value;
          this.step2?.seatChartGenerator(col, row, rowType);
        };

        this.step2?.setSeatSettingType(SeatSettingType.showOrNot);
        this.formGroup.disable();
        this.step++;
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
    this.setHintText();
  }

  lastStep(): void {
    this.step--;
    this.setHintText();

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
      name: "第" + formValue.theaterName + "廳",
      type: formValue.theaterType,
      floor: formValue.theaterFloor,
      totalCapacity: totalCapacity,
      wheelChairCapacity: wheelChairCapacity,
      row: formValue.row,
      col: formValue.col,
      rowLabel: formValue.step2.rowLabel,
      colLabel: formValue.step2.colLabel,
      seatMap: formValue.step2.seatMap
    };

    console.log(para);
    // if (this.isEdit) {
    //   // 編輯狀態
    //   this.patchUpdateTheaterAPI(para);
    // } else {
    //   // 新增狀態
    //   para = {
    //     ...para,
    //     status: 0
    //   };
    //   this.postCreateTheaterAPI(para);
    // };
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

  // API- 取得影廳資料
  getTheaterInfoAPI(): void {
    setTimeout(() => {
      this.theaterService.getTheaterInfo(this.theaterId).subscribe(res => {
        console.log(res)
        this.changeDetectorRef.detectChanges();
        this.setForm(res.data);
  
        //直接去第二步
        this.nextStep();
      });
    });
  }

  // API- 新增影廳
  postCreateTheaterAPI(para: any): void {
    this.theaterService.createTheater(para).subscribe(res => {
      console.log('新增影廳資訊-成功res', res);
      this.router.navigate([STATIC_ROUTES.THEATER, res.data.theater._id]);
      alert(res.message);
    });
  }

  // API- 更新影廳
  patchUpdateTheaterAPI(para: any): void {
    this.theaterService.updateTheater(this.theaterId, para).subscribe(res => {
      console.log('更新影廳資訊-成功res', res);
      this.router.navigate([STATIC_ROUTES.THEATER, this.theaterId]);
      alert(res.message);
    });
  }
}
