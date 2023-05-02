import { Component, OnInit } from '@angular/core';
import { LoginReq } from '../../api/cinePOS-api';
import { Router } from '@angular/router';
import { STATIC_ROUTES } from '../../core/constant/routes.constant';
import { environment } from 'projects/staff/src/environments/environment';
import { LoginService } from './services/login.service';

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
    this.loginService.v1StaffLoginPost$($event)
      .subscribe(() => {
        this.router.navigate([STATIC_ROUTES.HOME]);
      })
  }

}
