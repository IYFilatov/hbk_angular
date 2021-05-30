import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './modules/error-pages/pages/page-not-found/page-not-found.component';

import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';
import { SnackBarMessageComponent } from './shared/components/snack-bar-message/snack-bar-message.component';

import { MockBackendInterceptorInterceptor } from './core/interceptors/mock-backend-interceptor.interceptor';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

import { AuthPagesModule } from './modules/auth-pages/auth-pages.module';
import { MainFrameModule } from './modules/main-frame/main-frame.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ConfirmationDialogComponent,
    SnackBarMessageComponent    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
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
