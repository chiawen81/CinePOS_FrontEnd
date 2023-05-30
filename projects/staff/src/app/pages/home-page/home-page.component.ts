import { Component, OnInit } from '@angular/core';
import { STATIC_ROUTES } from '../../core/constant/routes.constant';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor() { }
  STATIC_ROUTES = STATIC_ROUTES;
  ngOnInit(): void {
  }

}
