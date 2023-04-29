import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'projects/manager/src/environments/environment';
import { STATIC_ROUTES } from '../../constant/routes.constant';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  title = 'manager';
  currentVersion = environment.appVersion;
  constructor(
    private router: Router
  ) { }

  isLoginPage = true;

  ngOnInit(): void {
    // 判斷路由是否為登入頁，若是則隱藏header跟購物車
    this.router.events.pipe(
    ).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === `/${STATIC_ROUTES.LOGIN}` ? true : false;
      }
    })

  }

  toLogin(){
    this.router.navigate([STATIC_ROUTES.LOGIN])
  }
}
