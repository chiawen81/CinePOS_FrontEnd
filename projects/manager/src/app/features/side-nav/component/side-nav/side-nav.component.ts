import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  sideNavData = [
    {
      title: "電影資訊",
      iconFilePath: "assets/images/icon/menu-movie-info.svg",
      url: "/",
      subMenu: [
        {
          title: "電影資訊列表頁",
          url: "/movie/list",
        }, {
          title: "新增電影",
          url: "/movie/detail/create",
        }
      ]
    }, {
      title: "排片規劃",
      iconFilePath: "assets/images/icon/menu-timetable.svg",
      url: "/timetable",
      subMenu: []
    }, {
      title: "廳院管理",
      iconFilePath: "assets/images/icon/menu-seat.svg",
      url: "/",
      subMenu: [
        {
          title: "新增影廳",
          url: "seating-plan/detail/create",
        }
      ]
    }, {
      title: "營運分析",
      iconFilePath: "assets/images/icon/menu-dashboard.svg",
      url: "/Dashboard",
      subMenu: []
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
