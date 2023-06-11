import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { STATIC_ROUTES } from 'projects/manager/src/app/core/constant/routes.constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUrl!: string;
  mainCrumb = '營運分析';
  subCrumb = '';
  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    const [root, mainPath, subPath, thdPath] = this.currentUrl.split('/');
    this.mainPathPipe(mainPath);
    this.subPathPipe();
    // subscribe to router events
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // get the current url
        this.currentUrl = event.urlAfterRedirects;
        const [root, mainPath, subPath, thdPath] = this.currentUrl.split('/');
        this.mainPathPipe(mainPath);
        this.subPathPipe();
      }
    });
  }

  ngOnInit(): void {
  }

  mainPathPipe(mainPath: string) {
    switch (mainPath) {
      case STATIC_ROUTES.MOVIE:
        this.mainCrumb = '電影資訊';
        break;
      case STATIC_ROUTES.TIMETABLE:
        this.mainCrumb = '排片規劃';
        break;
      case STATIC_ROUTES.THEATER:
        this.mainCrumb = '影廳管理';
        break;
      case STATIC_ROUTES.DASHBOARD:
        this.mainCrumb = '營運分析';
        break;
      default:
        break;
    }
  }

  subPathPipe() {
    if (this.currentUrl.includes(STATIC_ROUTES.LIST)) {
      this.subCrumb = '列表';
    } else if (this.currentUrl.includes(STATIC_ROUTES.CREATE)) {
      this.subCrumb = '新增';
    } else if (this.currentUrl.includes(STATIC_ROUTES.EDIT)) {
      this.subCrumb = '修改';
    } else if (this.currentUrl.includes(STATIC_ROUTES.DETAIL)) {
      this.subCrumb = '明細';
    } else{
      this.subCrumb = '';
    }
  }

}
