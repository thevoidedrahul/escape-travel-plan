import { ModuleWithProviders, NgModule } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpService } from "./http.service";
import { InterceptorModule } from "./interceptor";

@NgModule({
    imports: [
        InterceptorModule.forRoot()
    ]
})

export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [
                HttpService,
                ApiService
            ]
        }
    }
}