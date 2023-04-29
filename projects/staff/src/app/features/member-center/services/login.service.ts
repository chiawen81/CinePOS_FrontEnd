import { Injectable } from '@angular/core';
import { AccountService, LoginRes, LoginReq } from '../../../api/cinePOS-api';
import { Observable, filter, tap } from 'rxjs';
import { StorageService } from '../../../core/services/storage/storage.service';
import { StorageEnum } from '../../../core/enums/storage/storage-enum';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private accountService: AccountService,
    private storageService: StorageService
  ) { }


  logInPost$(LoginReq: { staffId: string, password: string }): Observable<any> {
    return this.accountService.logInPost(LoginReq)
      .pipe(
        // 照規格抓到錯誤狀態
        // tap(res => res.code !== 1 && alert(res.message)),
        // filter(res => res.code === 1)
        tap((res) => {
          this.storageService.setLocalStorage(StorageEnum.token,res.user!.token);
          this.storageService.setLocalStorage(StorageEnum.name,res.user!.name);
        })
      )
  }
}
