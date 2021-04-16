import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { state } from '../local/state';
import { districtarray } from '../local/districtarray';
import { districtIn } from '../local/districtIn';

@Component({
  selector: 'app-districts',
  templateUrl: './districts.component.html',
  styleUrls: ['./districts.component.css']
})
export class DistrictsComponent implements OnInit {

  constructor(private http:HttpClient) { }


  Response:state;
  public Searchterm:string="";
  public distarray:any ={};
  public distIn:districtIn[];
  public districtarr:districtarray;
  public districtKeys:Array<string>=[];
  ngOnInit(): void {

    this.req().toPromise().then(data=>{
       // console.log(data);
        this.Response=data
        console.log(this.Response);
        this.distarray= this.Response['Tamil Nadu'];
        this.districtarr = this.distarray.districtData;
        
        console.log(this.districtarr);
        
        this.key();
        for(var key in this.districtarr){
          console.log(key +'key is'+this.districtarr[key].active);
        }
       // console.log(this.distarray.districtData)
       //console.log(this.Response['Tamil Nadu'])
      //console.log(this.Response['Tamil Nadu']);
      });
  }
 public key():Array<string>{
    this.districtKeys= Object.keys(this.districtarr);
    return this.districtKeys;
  }
  req():Observable<any>
  {
    return this.http.get<any>("https://api.covid19india.org/state_district_wise.json").pipe(retry(2),catchError((error:HttpErrorResponse)=>{

    let err="";
    if(error.error instanceof ErrorEvent)
    {
       err=`error of ${error.error.message}`;
    }
    else {
     
      err = `Error Status: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(err);
    }))
  }

}
