import { FactoryProvider, InjectionToken, NgModule } from "@angular/core";
import { EnvironmentConfigurationService } from "../core/services/environment-configuration.service";
import { ApiModule as OpenApiModule } from "./open-api/api.module";
import { BASE_PATH as FRONT_STAGE_BASE_PATH } from "./open-api";


/**
 * @param token 各自來源的 BASE_PATH token，使用 import as
 * @param path API 網址的路徑 (env.json)
 * @returns
 */
 function apiUrlProvider(token: InjectionToken<string>, path: string): FactoryProvider {
    return {
        provide: token,
        useFactory: (configService: EnvironmentConfigurationService) => {
            const config = configService.environmentConfig;
            const objProperties = path.split('.');
            const result = objProperties.reduce((a, b) => a[b], config);

            if (!!result) {
                return result;
            }

            throw `env.json 找不到 ${path}，請檢查！`
        },
        deps: [EnvironmentConfigurationService],
        multi: true
    }
}

@NgModule({
    providers: [
        apiUrlProvider(FRONT_STAGE_BASE_PATH, 'apiUrl.openApi'),
    ],
    imports: [
      OpenApiModule
    ],
})
export class ExternalApiModule { }
