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
import { HttpClientModule } from '@angular/common/http';
import { EnvService } from './core/services/env/env.service';
import { ShareLibsModule } from 'projects/share-libs/src/public-api';
import { DialogModule } from './features/dialog/dialog.module';

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
    // ExternalApiModule,
    HttpClientModule,
    ...featureModules,
    ...materialModules,
    ShareLibsModule
  ],
  exports: [
    ...materialModules
  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (configService: EnvService) => () => configService.loadEnvironment(),
    //   deps: [EnvService],
    //   multi: true
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
