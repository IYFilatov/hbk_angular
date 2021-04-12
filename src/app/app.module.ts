//11h
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './modules/error-pages/pages/page-not-found/page-not-found.component';

import { MockBackendInterceptorInterceptor } from './core/interceptors/mock-backend-interceptor.interceptor';
import { MainFrameModule } from './modules/main-frame/main-frame.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    MainFrameModule,
    AppRoutingModule,
    HttpClientModule    
  ],
  providers: [
    //mock-backend-interceptor
    { provide: HTTP_INTERCEPTORS, useClass: MockBackendInterceptorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
