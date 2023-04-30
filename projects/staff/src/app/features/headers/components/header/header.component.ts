import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  profileData = {
    staffId: '14231',
    name: '陳小狗',
    imgUrl: 'assets/images/angular-icon.webp'
  }

  active = false;
  isTicket = true;
  ngOnInit(): void {
  }

}
