import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../features/member-center/services/login.service';
import { LoginReq } from '../../api/cinePOS-api';
import { Router } from '@angular/router';
import { STATIC_ROUTES } from '../../core/constant/routes.constant';
import { environment } from 'projects/staff/src/environments/environment';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    // private loginService: LoginService,
    private router:Router
  ) { }
  currentVersion = environment.appVersion;
  ngOnInit(): void {

  }

  login($event: LoginReq): void {
    // this.loginService.logInPost$($event)
    //   .subscribe(() => {
    //     this.router.navigate([STATIC_ROUTES.HOME]);
    //   })
  }

}
