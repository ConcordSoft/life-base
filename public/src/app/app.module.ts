import {
  BrowserModule
} from '@angular/platform-browser';
import {
  NgModule
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  HttpModule,
  RequestOptions,
  XHRBackend,
  BrowserXhr
} from '@angular/http';

import {HttpClientModule} from '@angular/common/http';

import {
  NgProgressModule,
  NgProgressBrowserXhr
} from 'ngx-progressbar';

import {
  AuthGuard,
  HttpService,
  SessionService,
} from './_core/index';

import {
  UserService, PaymentService
} from './_services/index';

import {
  AppComponent
} from './app.component';
import {
  ChildComponent
} from './components/child/child.component';
import {
  AppRoutingModule
} from './/app-routing.module';
import {
  SonComponent
} from './components/son/son.component';
import {
  HusbandComponent
} from './components/husband/husband.component';
import {
  FatherComponent
} from './components/father/father.component';
import {
  HomeComponent
} from './components/home/home.component';

export function httpServiceFactory(backend: XHRBackend, options: RequestOptions, sessionService: SessionService) {
  return new HttpService(backend, options, sessionService);
}

@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    SonComponent,
    HusbandComponent,
    FatherComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    NgProgressModule
  ],
  providers: [
    AuthGuard,
    HttpService,
    SessionService,
    UserService,
    PaymentService,
    { provide: BrowserXhr, useClass: NgProgressBrowserXhr },
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, SessionService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}