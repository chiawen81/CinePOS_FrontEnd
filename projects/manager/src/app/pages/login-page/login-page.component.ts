import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'projects/manager/src/environments/environment';
import { STATIC_ROUTES } from '../../core/constant/routes.constant';
import { LoginReq } from '../../api/cinePOS-api';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router:Router
  ) { }
  currentVersion = environment.appVersion;
  ngOnInit(): void {

  }

  login($event: LoginReq): void {
    this.loginService.login$($event)
      .subscribe(() => {
        this.router.navigate([STATIC_ROUTES.DASHBOARD]);
      })
  }
}
