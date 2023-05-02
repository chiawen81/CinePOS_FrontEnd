import { Component, Input, OnInit } from '@angular/core';
import { ComponentInjectorService } from 'projects/staff/src/app/core/services/componentInjector/component-injector.service';
import { ProfileGialogComponent } from '../../../dialog/components/profile-gialog/profile-gialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ProfileData } from 'projects/staff/src/app/core/interface/profile-data';
import { Router } from '@angular/router';
import { STATIC_ROUTES } from 'projects/staff/src/app/core/constant/routes.constant';
import { StorageService } from 'projects/staff/src/app/core/services/storage/storage.service';
import { StorageEnum } from 'projects/staff/src/app/core/enums/storage/storage-enum';
import { MenuType } from 'projects/staff/src/app/core/constant/menu.type';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private componentInjector: ComponentInjectorService,
    private dialog: MatDialog,
    private router: Router,
    private storageService:StorageService
  ) { }

  @Input() menuType:MenuType = 'None';

  profileData: ProfileData = {
    staffId: '14231',
    name: '陳小狗',
    imgUrl: 'assets/images/angular-icon.webp'
  }

  active = false;
  isTicket = true;


  ngOnInit(): void {
  }

  openProfile(): void {
    this.componentInjector.injectComponent(ProfileGialogComponent);
    this.dialog.open(ProfileGialogComponent, {
        width: '450px',
        data: this.profileData
      }
    );
  }
  goHome(): void{
    this.active = false;
    this.router.navigate([STATIC_ROUTES.HOME]);
  }
  goBooking(): void{
    this.active = true;
    this.isTicket = true;
    this.router.navigate([STATIC_ROUTES.BOOKING.ROOT]);
  }
  goRefund(): void{
    this.active = true;
    this.isTicket = false;
    this.router.navigate([STATIC_ROUTES.REFUND]);
  }
  logOut(): void{
    this.storageService.removeLocalStorage(StorageEnum.token);
    this.router.navigate([STATIC_ROUTES.LOGIN]);
  }
}
