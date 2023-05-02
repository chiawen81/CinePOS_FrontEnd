import { FactoryProvider, InjectionToken, NgModule } from "@angular/core";


@NgModule({

})

export class ExternalApiModule {
  static apiUrlProvider(token: InjectionToken<string>, path: string): FactoryProvider {
    return {
      provide: token,
      useFactory: () => {
        const apiUrl = path;
        if (!!apiUrl) {
          return apiUrl;
        }
        throw `找不到 ${path}，請檢查！`
      },
      multi: true
    }
  }
}
