import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'intro';

  frontURL = "https://www.cine-pos.com/staff/login";
  backendURL = "https://www.cine-pos.com/manager/login";
}
