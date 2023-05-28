import { ManagerService } from './../../../api/cinePOS-api/api/manager.service';
import { Injectable } from '@angular/core';
import { LoginRes } from '../../../api/cinePOS-api';
import { Observable, filter, map, tap } from 'rxjs';
import { StorageEnum } from '../../../core/enums/storage/storage-enum';
import { StorageService } from '../../../core/services/storage/storage.service';
import { ProfileData } from '../../../core/models/profile-data.model';
import { Router } from '@angular/router';
import { STATIC_ROUTES } from '../../../core/constant/routes.constant';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private managerService: ManagerService,
    private storageService: StorageService,
    private router: Router
  ) { }

  login$(LoginReq: { staffId: string, password: string }): Observable<LoginRes> {
    return this.managerService.v1ManagerLoginPost(LoginReq)
      .pipe(
        tap(res => res.code !== 1 && alert(res.message)),
        filter(res => res.code === 1),
        tap((res) => {
          if (res.data) {
            this.storageService.setLocalStorage(StorageEnum.token, res.data.token);
            const profileData: ProfileData = {
              name: res.data.name!,
              staffId: res.data.staffId!,
              imgUrl: 'assets/images/angular-icon.webp'
            }
            this.storageService.setSessionStorage(StorageEnum.staffId, profileData.staffId);
            this.storageService.profileData$.next(new ProfileData(profileData));
          }
        })
      )
  }

  getProfile(staffId: string) {
    return this.managerService.v1ManagerUserProfileStaffIdGet(staffId)
      .pipe(
        map((res) => {
          if (res.data) {
            const profileData: ProfileData = {
              name: res.data.name!,
              staffId: res.data.staffId!,
              imgUrl: 'assets/images/angular-icon.webp'
            }
            this.storageService.setSessionStorage(StorageEnum.staffId, profileData.staffId);
            this.storageService.profileData$.next(new ProfileData(profileData));
            console.log(profileData);
            return profileData
          }
          return null;
        })
      )
  }

  logout(){
    this.storageService.clearSessionStorage();
    this.storageService.clearLocalStorage();
    this.router.navigate([STATIC_ROUTES.LOGIN]);
  }
}
