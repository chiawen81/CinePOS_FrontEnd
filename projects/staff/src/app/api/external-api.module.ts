import { FactoryProvider, InjectionToken, NgModule } from "@angular/core";
import { ApiModule as CinePosApiModule } from "./cinePOS-api/api.module";
import { BASE_PATH as CINE_POS_BASE_PATH } from "./cinePOS-api";
import { EnvService } from "../core/services/env/env.service";



/**
 * @param token 各自來源的 BASE_PATH token，使用 import as
 * @param path API 網址的路徑 (env.json)
 * @returns
 */
 function apiUrlProvider(token: InjectionToken<string>, path: string): FactoryProvider {
    return {
        provide: token,
        useFactory: (configService: EnvService) => {
            const config = configService.environmentConfig;
            const objProperties = path.split('.');
            const result = objProperties.reduce((a, b) => a[b], config);
            if (!!result) {
                return result;
            }
            throw `env.json 找不到 ${path}，請檢查！`
        },
        deps: [EnvService],
        multi: true
    }
}

@NgModule({
    providers: [
        apiUrlProvider(CINE_POS_BASE_PATH, 'cinePosApi'),
    ],
    imports: [
      CinePosApiModule
    ],
})
export class ExternalApiModule { }
