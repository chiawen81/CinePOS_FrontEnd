import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'cine-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  host: {},
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, AfterViewInit {
  @HostBinding('class') class = 'cine-table';
  @ViewChild('cineTable') cineTable!: ElementRef;
  /** table 是否無資料 */
  get checkIsEmpty(): boolean {
    const isEmpty = this.el.nativeElement.querySelector('tbody').rows.length === 0;
    return isEmpty;
  }

  /** 取得標頭數量 */
  get thCount(): number {
    const count = this.cineTable?.nativeElement?.rows[0].cells.length || 0;
    return count;
  }
  constructor(
    private el: ElementRef,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }
}
