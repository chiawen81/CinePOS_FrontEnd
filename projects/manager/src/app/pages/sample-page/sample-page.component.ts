import { Component, OnInit } from '@angular/core';
import { CinePageSet } from '../../share/pagination/page-set';
import { SAMPLE_LIST_MOCK } from './mock';

@Component({
  selector: 'app-sample-page',
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.scss']
})
export class SamplePageComponent implements OnInit {

  sampleList: any[] = SAMPLE_LIST_MOCK;
  displayList: any[] = SAMPLE_LIST_MOCK;
  pageSet1 = new CinePageSet();

  constructor() { }

  ngOnInit(): void {
    this.pageSet1.initialize(this.sampleList.length);


    // DEMO 才前端切
    this.displayList = this.pageSet1.slicePage(this.sampleList, this.pageSet1.currentPage, this.pageSet1.currentPageSize);

  }

  handlePageEvent($event: any) {
    console.log($event);
    this.pageSet1.currentPage = $event.pageIndex +1 ;
    this.displayList = this.pageSet1.slicePage(this.sampleList, this.pageSet1.currentPage , this.pageSet1.currentPageSize);

  }
}
