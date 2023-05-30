import { StorageService } from './../../../../core/services/storage/storage.service';
import { Component, OnInit } from '@angular/core';
import { STATIC_ROUTES } from 'projects/manager/src/app/core/constant/routes.constant';
import { ProfileData } from 'projects/manager/src/app/core/models/profile-data.model';
import { LoginService } from 'projects/manager/src/app/pages/login-page/service/login.service';
import { environment } from 'projects/manager/src/environments/environment';

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
      url: "",
      subMenu: [
        {
          title: "電影資訊列表頁",
          url: `/${STATIC_ROUTES.MOVIE}/${STATIC_ROUTES.LIST}`,
        }, {
          title: "新增電影",
          url: `/${STATIC_ROUTES.MOVIE}/${STATIC_ROUTES.DETAIL}/${STATIC_ROUTES.CREATE}`,
        }
      ]
    }, {
      title: "排片規劃",
      iconFilePath: "assets/images/icon/menu-timetable.svg",
      url: `/${STATIC_ROUTES.TIMETABLE}`,
      subMenu: []
    }, {
      title: "影廳管理",
      iconFilePath: "assets/images/icon/menu-seat.svg",
      url: "",
      subMenu: [
        {
          title: "影廳列表",
          url: `/${STATIC_ROUTES.SEATING_PLAN}`,
        },
        {
          title: "新增影廳",
          url: `/${STATIC_ROUTES.SEATING_PLAN}/${STATIC_ROUTES.DETAIL}/${STATIC_ROUTES.CREATE}`,
        }
      ]
    }, {
      title: "營運分析",
      iconFilePath: "assets/images/icon/menu-dashboard.svg",
      url: `/${STATIC_ROUTES.DASHBOARD}`,
      subMenu: []
    }
  ];

  profileData!:ProfileData;
  currentVersion = environment.appVersion;
  constructor(
    public storageService: StorageService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {

    // this.profileData = this.storageService.getProfileData();
  }

  logout(){
    this.loginService.logout();
  }

}
