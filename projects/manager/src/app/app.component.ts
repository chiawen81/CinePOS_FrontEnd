import { LoadingService } from './../../../share-libs/src/lib/features/loading/loading.service';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { STATIC_ROUTES } from './core/constant/routes.constant';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'staff';
  currentVersion = environment.appVersion;
  constructor(
    private router: Router,
    private loadingService :LoadingService
  ) { }

  isLoginPage = true;

  ngOnInit(): void {
    // this.loadingService.loading(true);

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
