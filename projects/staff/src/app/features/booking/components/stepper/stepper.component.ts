import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { STATIC_ROUTES } from 'projects/staff/src/app/core/constant/routes.constant';

interface StepperInterface {
  step: number;
  title: string;
  isActive: boolean;
}
@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  constructor(
    private activatedRoute:ActivatedRoute
  ) { }
  stepperData:StepperInterface[] = [
    {
      step: 1,
      title: '選擇票種與票數',
      isActive: false
    },
    {
      step: 2,
      title: '劃位',
      isActive: false
    }

  ]
  ngOnInit(): void {
    // 根據路由變換step選擇
    this.activatedRoute.url.subscribe(urlSegments => {
      const currentRoute = urlSegments.join('/'); // 取得目前路由
      switch (currentRoute){
        case STATIC_ROUTES.BOOKING.TICKET_TYPE:
          this.stepperData[0].isActive = true;
          break;
        case STATIC_ROUTES.BOOKING.SELECT_SEAT:
          this.stepperData.forEach(item => {
            item.isActive =true
          });
          break;
      }
    });
  }

}
