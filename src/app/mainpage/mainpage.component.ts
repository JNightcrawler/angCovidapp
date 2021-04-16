import { Component, OnInit, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { response } from "./Response";
import { Observable,of,throwError } from 'rxjs';
import { retry,catchError } from 'rxjs/operators';
import { DatareqService } from "../datareq.service";
import { EventEmitter } from 'protractor';
import { countries } from './countries';



@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  
  responses:response;
  public loader:string='block';
  obser:Observable<response>;
  anyRes:any;
  searchtext:string;
  public loadit:boolean =true;
  p:number=1;
  constructor(private http:HttpClient,private service:DatareqService) {
   
   }
  
   public handleErr(){

   }
  ngOnInit(): void {
    this.service.cast.subscribe(hasload =>this.loadit = hasload);
    console.log("ng init of main page")
   // this.http.get<any>("https://api.covid19api.com/summary").toPromise().then(data=>{
    this.req().subscribe(data => {
      this.responses =data
      this.responses.Countries.sort((countrya,countryb)=>
        countryb.TotalConfirmed-countrya.TotalConfirmed
      );
    });
     
     // this.responses=data;
    this.loadit=false;

    setTimeout(()=>{
      this.loader ='none';
    },3000)
   
    console.log("loading "+this.loadit);
    this.service.getnotify(this.loadit);
    console.log('after rquet---> '+this.loadit);
  //  });
  //this.service.getsummary().subscribe(data=>this.responses=data)
  
   // console.log(this.anyRes);
    //this.obser.subscribe(data=>this.responses=data);
   // console.log(this.responses);
  }

  req():Observable<any> {

  return  this.http.get<any>("https://api.covid19api.com/summary").pipe(retry(2),catchError((error:HttpErrorResponse)=>{
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
      } else {
          // server-side error
          errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
      }
      alert(errorMessage);
      console.log(errorMessage);
      return throwError(errorMessage);

    }));
  }

  /*getrequest():Observable<any> {
    return this.http.get<any>("https://api.covid19api.com/countries");
  }*/

}
