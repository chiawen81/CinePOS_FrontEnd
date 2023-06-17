import { Injectable } from '@angular/core';
import { filter, Observable, tap } from 'rxjs';
import { LoginRes, StaffService, UserProfileRes } from '../../../api/cinePOS-api';
import { StorageEnum } from '../../../core/enums/storage/storage-enum';
import { StorageService } from '../../../core/services/storage/storage.service';
import { ProfileData } from '../../../core/interface/profile-data';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private staffService:StaffService,
    private storageService: StorageService
  ) { }

  /**登入請求 */
  v1StaffLoginPost$(LoginReq: { staffId: string, password: string }): Observable<LoginRes> {
    return this.staffService.v1StaffLoginPost(LoginReq)
      .pipe(
        tap(res => res.code !== 1 && alert(res.message)),
        filter(res => res.code === 1),
        tap((res) => {
          this.storageService.setLocalStorage(StorageEnum.token,res.data!.token);
        })
      )
  }
  /**取得櫃台人員資料 */
  v1StaffUserProfileStaffIdGet(staffId: string): Observable<UserProfileRes> {
    return this.staffService.v1StaffUserProfileStaffIdGet(staffId)
      .pipe(
        tap(res => res.code !== 1 && alert(res.message)),
        filter(res => res.code === 1),
        tap((res) => {
          const profileData:ProfileData = {
            name: res.data?.name!,
            staffId: res.data!.staffId!,
            imgUrl: !!res.data!.stickerUrl! ?  res.data!.stickerUrl!:'assets/images/angular-icon.webp'
          }
          this.storageService.setLocalStorage(StorageEnum.profileData,profileData);
        })
      )

  }

}
