import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ChildComponent } from './components/child/child.component';
import { SonComponent } from './components/son/son.component';
import { FatherComponent } from './components/father/father.component';
import { HusbandComponent } from './components/husband/husband.component';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
{
	path: '',
	component: HomeComponent
},
{
	path: 'Child',
	component: ChildComponent
},
{
  path: 'Son',
  component: SonComponent
},
{
  path: 'Father',
  component: FatherComponent
},
{
  path: 'Husband',
  component: HusbandComponent
}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
