import { FactoryProvider, InjectionToken, NgModule } from "@angular/core";
import { ApiModule as CinePosApiModule } from "./cinePOS-api/api.module";
import { BASE_PATH , Configuration } from "./cinePOS-api";
import { environment } from "../../environments/environment";



/**
 * @param token 各自來源的 BASE_PATH token，使用 import as
 * @param path API 網址路徑
 * @returns
 */
 function apiUrlProvider(token: InjectionToken<string>, path: string): FactoryProvider {
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

@NgModule({
    providers: [
        apiUrlProvider(BASE_PATH, environment.cinePosApi),
    ],
    imports: [
      CinePosApiModule.forRoot(() => new Configuration()),
    ],
})
export class ExternalApiModule {
  static apiUrlProvider: any;
}
