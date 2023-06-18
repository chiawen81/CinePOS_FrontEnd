import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CinePageSet } from '../../share/pagination/page-set';
import * as echarts from 'echarts';
import { DashboardPageService } from './service/dashboard-page.service';
import { DashboardBoxOfficeChartSuccessDataPercentChartData, DashboardBoxOfficeChartSuccessDataRankChartData, DashboardMetricSuccessData } from '../../api/cinePOS-api';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  pageSet1 = new CinePageSet();
  isShowSchedule: boolean = false;                                                          // 是否顯示場次表
  arrowWords: string = "";                                                                  // 漲幅文字

  /* API */
  scheduleListView: any = [];                                                               // API- 選項：狀態
  scheduleOriginalApiData: any = [];                                                        // API- 電影列表(原始資料)
  metricData!: DashboardMetricSuccessData;                                                  // API- 當日營收資料


  constructor(
    private _DashboardPageService: DashboardPageService,
    private _ChangeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getScheduleListAPI();                                                              // API- 取得選項資料
    this.getBoxOfficeChartData("2023/06/12");                                               // API- 取得票房圖表資料
    // ====  ps. 這裡之後可擴充做活的
    this.getMetric("2023/06/12");                                                           // API- 取得當日營收
  }



  // ————————————————————————————————  圖表  ————————————————————————————————
  // 圖表- 初始化
  initChart() {
    setTimeout(() => {
      this.setCustomerChart();                                                              // 圖表- 觀影人數初始化
    }, 4000);
  }



  // 圖表- 電影票房佔比初始化
  setIncomePercentChart(percentChartData: DashboardBoxOfficeChartSuccessDataPercentChartData[]) {
    var myChart = echarts.init((document.getElementById('income-percent-chart') as any));
    var option = {
      series: [
        {
          type: 'pie',
          data: percentChartData,
          roseType: 'area'
        }
      ],
      animationDuration: 3000,
      animationDurationUpdate: 2000,
    };

    myChart.setOption(option as any);
  }



  // 圖表- 電影票房排行初始化
  setIncomeRankChart(rankChartData: DashboardBoxOfficeChartSuccessDataRankChartData) {
    var myChart = echarts.init((document.getElementById('income-rank-chart') as any));

    var data = rankChartData.value;
    var option = {
      xAxis: {
        max: 'dataMax'
      },
      yAxis: {
        type: 'category',
        data: rankChartData.name,
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        max: 5 // only the largest 3 bars will be displayed
      },
      series: [
        {
          realtimeSort: true,
          name: 'X',
          type: 'bar',
          data: data,
          label: {
            show: true,
            position: 'right',
            valueAnimation: true
          },
          itemStyle: {
            color: '#A7E8FF',
          },
        }
      ],
      legend: {
        show: true
      },
      animationDuration: 3000,
      animationDurationUpdate: 2000,
      animationEasing: 'linear',
      animationEasingUpdate: 'linear'
    };

    myChart.setOption(option as any);
  }



  // 圖表- 觀影人數初始化
  setCustomerChart() {
    var myChart = echarts.init((document.getElementById('customer-chart') as any));

    // 指定图表的配置项和数据
    var option = {
      xAxis: {
        data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],

      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: [9, 12, 14, 12, 35, 60, 39],
          itemStyle: {
            color: 'rgba(156, 109, 255, 1)',
          }
        },
        {
          type: 'bar',
          data: [11, 12, 11, 13, 36, 54, 42],
          itemStyle: {
            color: 'rgba(113, 221, 255, 1)',
          }
        }
      ],
      animationDuration: 3000,
      animationDurationUpdate: 2000,
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }





  // ————————————————————————————————  其它  ————————————————————————————————
  // 切換場次表
  triggerSchedule() {
    this.isShowSchedule = !this.isShowSchedule;
  }



  // 切換頁碼
  handlePageEvent($event: any) {
    console.log($event);
    this.pageSet1.currentPage = $event.pageIndex + 1;
    this.scheduleListView = this.pageSet1.slicePage(this.scheduleOriginalApiData, this.pageSet1.currentPage, this.pageSet1.currentPageSize);
    this._ChangeDetectorRef.detectChanges();
  }





  // ————————————————————————————————  API  ————————————————————————————————
  // API- 取得場次資料
  getScheduleListAPI() {
    // let startDate = new Date("2023/06/03").getTime();
    // let endDate = new Date("2023/06/03").getTime();
    // console.log('startDate', startDate, 'endDate', endDate);

    // this._TimetableService.getTimetableList(startDate, endDate).subscribe(res => {
    //   console.log('取得場次', res);
    //   this.scheduleOriginalApiData = res.data;

    //   // 表格元件- 取得最新列表資料
    //   this.scheduleListView = this.pageSet1.slicePage(this.scheduleOriginalApiData, this.pageSet1.currentPage, this.pageSet1.currentPageSize);

    //   // 表格元件- 更新頁碼
    //   this.pageSet1.initialize(this.scheduleOriginalApiData.length);
    //   this._ChangeDetectorRef.detectChanges();
    // });


    // 場次資訊假資料
    this.scheduleOriginalApiData = [
      {
        _id: "647b54e16fe79b08c9e27ffe",
        movieId: {
          _id: "6458714468d71390eba680a3",
          title: "星際異攻隊3",
          runtime: 149,
          rate: 6
        },
        theaterId: {
          _id: "6476459f252fe93e036f7def",
          name: "第1廳"
        },
        startDate: "2023-06-03T16:30:00.000Z",
        endDate: "2023-06-03T18:00:00.000Z",
        createdAt: "2023-06-03T14:57:37.774Z",
        updatedAt: "2023-06-03T14:57:37.774Z"
      },
      {
        _id: "647c2e2f6b66edc23d087c2b",
        movieId: {
          _id: "645872c568d71390eba7993e",
          title: "梵蒂岡驅魔士",
          runtime: 103,
          rate: 15
        },
        theaterId: {
          _id: "647645c2252fe93e036f7dfa",
          name: "第4廳"
        },
        startDate: "2023-06-03T18:00:00.000Z",
        endDate: "2023-06-03T19:30:00.000Z",
        createdAt: "2023-06-04T06:24:47.913Z",
        updatedAt: "2023-06-04T06:24:47.913Z"
      }, {
        _id: "647c2e2f6b66edc23d087c2b",
        movieId: {
          _id: "645872c568d71390eba7993e",
          title: "瑪利歐兄弟",
          runtime: 96,
          rate: 12
        },
        theaterId: {
          _id: "647645c2252fe93e036f7dfa",
          name: "第9廳"
        },
        startDate: "2023-06-03T17:00:00.000Z",
        endDate: "2023-06-03T18:30:00.000Z",
        createdAt: "2023-06-04T06:24:47.913Z",
        updatedAt: "2023-06-04T06:24:47.913Z"
      }, {
        _id: "647c2e2f6b66edc23d087c2b",
        movieId: {
          _id: "645872c568d71390eba7993e",
          title: "玩命關頭12",
          runtime: 133,
          rate: 6
        },
        theaterId: {
          _id: "647645c2252fe93e036f7dfa",
          name: "第6廳"
        },
        startDate: "2023-06-03T08:00:00.000Z",
        endDate: "2023-06-03T10:30:00.000Z",
        createdAt: "2023-06-04T06:24:47.913Z",
        updatedAt: "2023-06-04T06:24:47.913Z"
      }, {
        _id: "647c2e2f6b66edc23d087c2b",
        movieId: {
          _id: "645872c568d71390eba7993e",
          title: "鞋貓劍客3",
          runtime: 103,
          rate: 15
        },
        theaterId: {
          _id: "647645c2252fe93e036f7dfa",
          name: "第7廳"
        },
        startDate: "2023-06-03T10:00:00.000Z",
        endDate: "2023-06-03T12:30:00.000Z",
        createdAt: "2023-06-04T06:24:47.913Z",
        updatedAt: "2023-06-04T06:24:47.913Z"
      }
    ];

    // 表格元件- 取得最新列表資料
    this.scheduleListView = this.pageSet1.slicePage(this.scheduleOriginalApiData, this.pageSet1.currentPage, this.pageSet1.currentPageSize);

    // 表格元件- 更新頁碼
    this.pageSet1.initialize(this.scheduleOriginalApiData.length);

    // 圖表- 初始化
    this.initChart();
  }



  // API- 取得票房圖表資料
  getBoxOfficeChartData(searchDate: string) {
    this._DashboardPageService.getBoxOfficeChartData(searchDate).subscribe(res => {
      console.log('電影票房圖表資料', res);

      // 圖表- 電影票房佔比初始化
      this.setIncomePercentChart(res.data!.percentChartData as DashboardBoxOfficeChartSuccessDataPercentChartData[]);

      setTimeout(() => {
        this.setIncomeRankChart(res.data!.rankChartData as DashboardBoxOfficeChartSuccessDataRankChartData);      // 圖表- 電影票房排行初始化
      }, 2000);

    });
  }



  // API- 取得當日營收
  getMetric(searchDate: string) {
    this._DashboardPageService.getMetric(searchDate).subscribe(res => {
      this.metricData = res.data!;
      this.arrowWords = ((this.metricData?.dailyIncome?.increasePercent as number) > 0) ? "↑" : "↓";
      console.log('metricData', this.metricData?.dailyIncome);
      this._ChangeDetectorRef.detectChanges();
    });

  }


}
