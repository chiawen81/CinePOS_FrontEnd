import { LoadingService } from './../../../share-libs/src/lib/features/loading/loading.service';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { STATIC_ROUTES } from './core/constant/routes.constant';
import { environment } from '../environments/environment';
import { StorageService } from './core/services/storage/storage.service';
import { StorageEnum } from './core/enums/storage/storage-enum';
import { ManagerService } from './api/cinePOS-api';
import { LoginService } from './pages/login-page/service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'staff';
  currentVersion = environment.appVersion;
  constructor(
    public storageService: StorageService,
    private router: Router,
    private loginService: LoginService
  ) { }

  get isLogin() { return this.storageService.getSessionStorage(StorageEnum.staffId) && this.storageService.getLocalStorage(StorageEnum.token) };
  isLoginPage = true;
  ngOnInit(): void {
    const staffId = this.storageService.getSessionStorage(StorageEnum.staffId);
    const token = this.storageService.getLocalStorage(StorageEnum.token);
    if (staffId && token) {
      this.loginService.getProfile(staffId as string).subscribe();
    } else {
      this.storageService.clearLocalStorage();
      this.storageService.clearSessionStorage();
      this.toLogin();
    }
   // 判斷路由是否為登入頁，若是則隱藏header跟購物車
   this.router.events.pipe(
    ).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === `/${STATIC_ROUTES.LOGIN}` ? true : false;
      }
    })
  }

  toLogin() {
    this.router.navigate([STATIC_ROUTES.LOGIN])
  }

}
