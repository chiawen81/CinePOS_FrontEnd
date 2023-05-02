import { FactoryProvider, InjectionToken, NgModule } from "@angular/core";
import { ApiModule as CinePosApiModule } from "./cinePOS-api/api.module";
import { BASE_PATH, Configuration } from "./cinePOS-api";
import { environment } from "../../environments/environment";


@NgModule({

})

export class ExternalApiModule {
  static apiUrlProvider(token: InjectionToken<string>, path: string): FactoryProvider {
    return {
      provide: token,
      useFactory: () => {
        const apiUrl = path;
        console.log(apiUrl);
        if (!!apiUrl) {
          return apiUrl;
        }
        throw `找不到 ${path}，請檢查！`
      },
      multi: true
    }
  }
}
