import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadersModule } from './features/headers/headers.module';
import { ShopCartModule } from './features/shop-cart/shop-cart.module';

import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { ExternalApiModule } from './api/external-api.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ShareLibsModule } from 'projects/share-libs/src/public-api';
import { DialogModule } from './features/dialog/dialog.module';
import { environment } from '../environments/environment';
import { ApiModule as CinePosApiModule ,BASE_PATH, Configuration } from "./api/cinePOS-api";
import { ApiHeaderInterceptor } from './core/interceptor/api-header';
import { ErrorHeaderInterceptor } from './core/interceptor/error-interceptor';

const materialModules = [
  MatInputModule,
  MatSliderModule,
];

const featureModules = [
  HeadersModule,
  ShopCartModule,
  DialogModule
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ...featureModules,
    ...materialModules,
    ShareLibsModule,
    CinePosApiModule.forRoot(() => new Configuration()),
  ],
  exports: [
    ...materialModules
  ],
  providers: [
    ExternalApiModule.apiUrlProvider(BASE_PATH, environment.cinePosApi),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiHeaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHeaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
