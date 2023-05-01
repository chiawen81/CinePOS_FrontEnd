import { Component, OnInit } from '@angular/core';
import { ComponentInjectorService } from 'projects/staff/src/app/core/services/componentInjector/component-injector.service';
import { ProfileGialogComponent } from '../../../dialog/components/profile-gialog/profile-gialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ProfileData } from 'projects/staff/src/app/core/interface/profile-data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private componentInjector: ComponentInjectorService,
    private dialog: MatDialog
  ) { }

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
        data: {
          name: this.profileData.name,
          imgUrl: this.profileData.imgUrl,
          staffId: this.profileData.staffId
        }
      }
    );
  }
}
