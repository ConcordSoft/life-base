import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChildComponent } from './components/child/child.component';
import { AppRoutingModule } from './/app-routing.module';
import { SonComponent } from './components/son/son.component';
import { HusbandComponent } from './components/husband/husband.component';
import { FatherComponent } from './components/father/father.component';
import { HomeComponent } from './components/home/home.component';

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
      AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
