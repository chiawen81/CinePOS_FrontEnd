import { Injectable } from '@angular/core';
import { InfoUpdateRes, StaffService } from '../../../api/cinePOS-api';
import { StorageService } from '../../../core/services/storage/storage.service';
import { Observable, Subject, filter, tap } from 'rxjs';
import { ProfileData } from '../../../core/interface/profile-data';
import { StorageEnum } from '../../../core/enums/storage/storage-enum';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private staffService: StaffService,
    private storageService:StorageService
  ) { }

  changeProfile$(InfoUpdateReq: { newName: string, staffId: string }): Observable<InfoUpdateRes> {
    return this.staffService.v1StaffUserProfilePost(InfoUpdateReq)
      .pipe(
        tap(res => res.code !== 1 && alert(res.message)),
        filter(res => res.code === 1),
        tap((res) => {
          // const newProfileData: ProfileData = this.storageService.getLocalStorage(StorageEnum.profileData)!;
          // newProfileData.name = res.data?.newName!;
          // this.storageService.setLocalStorage(StorageEnum.profileData, newProfileData);
        })
      )
  }
}
