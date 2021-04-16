import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { HttpClientModule } from "@angular/common/http";
import { NgxPaginationModule } from "ngx-pagination";
import { FiltertablePipe } from './filtertable.pipe';
import { FormsModule } from "@angular/forms";
import { SlideComponent } from './slide/slide.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ChartsModule } from 'ng2-charts';
import { NgbarlineComponent } from './ngbarline/ngbarline.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LocalComponent } from './local/local.component';
import { DistrictsComponent } from './districts/districts.component';
import { DivfilterPipe } from './divfilter.pipe';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    LoginpageComponent,
    FiltertablePipe,
    SlideComponent,
    NgbarlineComponent,
    SpinnerComponent,
    LocalComponent,
    DistrictsComponent,
    DivfilterPipe,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    FontAwesomeModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
