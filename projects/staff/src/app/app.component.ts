import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { STATIC_ROUTES } from './core/constant/routes.constant';
import { environment } from '../environments/environment';
import { MenuType } from './core/constant/menu.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'staff';
  currentVersion = environment.appVersion;
  constructor(
    private router: Router
  ) { }

  isLoginPage = true;
  menuType:MenuType = 'None';

  ngOnInit(): void {
    // 判斷路由是否為登入頁，若是則隱藏header跟購物車
    this.router.events.pipe(
    ).subscribe((event) => {
      if (event instanceof NavigationEnd) {

        this.isLoginPage = event.url === `/${STATIC_ROUTES.LOGIN}` ? true : false;
        // 切換menuType
        if((event.url).includes(STATIC_ROUTES.BOOKING.ROOT)){
          this.menuType = 'Booking';
        }else if((event.url).includes(STATIC_ROUTES.REFUND)){
          this.menuType = 'Refund';
        }else{
          this.menuType = 'None';
        }
      }
    })

  }

  toLogin(){
    this.router.navigate([STATIC_ROUTES.LOGIN])
  }

}
