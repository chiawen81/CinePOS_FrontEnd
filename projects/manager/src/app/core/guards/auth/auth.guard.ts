import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { STATIC_ROUTES } from "../../constant/routes.constant";
import { StorageService } from "../../services/storage/storage.service";
import { StorageEnum } from "../../enums/storage/storage-enum";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private storageService: StorageService,
    private router: Router
  ) { }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.returnWay();

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.returnWay();
  }


  private returnWay(): boolean | Promise<boolean> {
    if (!this.storageService.getLocalStorage(StorageEnum.token) && !this.storageService.getSessionStorage(StorageEnum.staffId)) {
      return this.router.navigate([STATIC_ROUTES.LOGIN]);
    }
    return true;
  }
}
