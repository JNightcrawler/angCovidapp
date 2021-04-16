import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainpageComponent } from "./mainpage/mainpage.component";
import { LoginpageComponent } from "./loginpage/loginpage.component";
import { SlideComponent } from "./slide/slide.component";

const routes: Routes = [
  { path : 'main',component: MainpageComponent},
  { path : 'login',component:LoginpageComponent},
  {path:'slide',component:SlideComponent},
  { path : '',component:SlideComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents =[MainpageComponent,LoginpageComponent]
