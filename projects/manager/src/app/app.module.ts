import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadersModule } from './features/headers/components/headers.module';

import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { TimetablePageComponent } from './pages/timetable-page/timetable-page.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { ShareLibsModule } from 'projects/share-libs/src/public-api';
import { SideNavModule } from './features/side-nav/component/side-nav.module';


const materialModules = [
  MatInputModule,
  MatSliderModule,
];

const featureModules = [
  HeadersModule,
  SideNavModule
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    TimetablePageComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ...featureModules,
    ...materialModules,
    ShareLibsModule
  ],
  exports: [
    ...materialModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
