import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { STATIC_ROUTES } from "../../constant/routes.constant";
import { StorageService } from "../../services/storage/storage.service";
import { StorageEnum } from "../../enums/storage/storage-enum";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private storageService:StorageService,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (!this.storageService.getLocalStorage(StorageEnum.token)) {
      this.router.navigate([STATIC_ROUTES.LOGIN]);
      return false;
    }
    return true;
  }

}
