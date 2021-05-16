import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './modules/error-pages/pages/page-not-found/page-not-found.component';

import { MockBackendInterceptorInterceptor } from './core/interceptors/mock-backend-interceptor.interceptor';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

import { AuthPagesModule } from './modules/auth-pages/auth-pages.module';
import { MainFrameModule } from './modules/main-frame/main-frame.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,    
    AuthPagesModule,
    MainFrameModule,
    AppRoutingModule
  ],
  providers: [
    //mock-backend-interceptor
    { provide: HTTP_INTERCEPTORS, useClass: MockBackendInterceptorInterceptor, multi: true },
    
    //add token
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
