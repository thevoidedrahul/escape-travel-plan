import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ModuleWithProviders } from "@angular/core";
import { RequestInterceptor } from "./request.interceptor";

@NgModule({
  imports: [
    HttpClientModule
  ]
})

export class InterceptorModule {

  static forRoot(): ModuleWithProviders<InterceptorModule> {
    return {
      ngModule: InterceptorModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
      ]
    }
  }
}
