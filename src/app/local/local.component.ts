import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { state } from './state';
import { statedata } from '../tndata/statedata';
import { SingleDataSet, Label } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { districtdata } from "./districtdata";



@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit {

  constructor(private http:HttpClient) {
   }
  public pieChartLabels:Label[] = ['Confirmed', 'Recored', 'Death','Active'];
  public pieChartData:SingleDataSet=[];
  public pieChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public Colors:any = 
 [
{
  backgroundColor: [      
  '#FF5733',
  '#CB5036',
  '#A6E0DE ',
  'rgb(128, 165, 235)'
  ]
  }
]; 
  Response:state;
  Confiremd:number=0;
  Recovered:number=0;
  Death:number=0;
  NewConfiremd:number=0;
  NewRecovered:number=0;
  NewDeath:number=0;
  ActiveCase:number=0;
  NewActive:number =0;
  responsestatedata:statedata[];

  public statedata:districtdata[];
  
  ngOnInit(): void {
  
   

    this.reqStatedata().subscribe(data=> {
     // this.responsestatedata=data
     
     let stateWise;
     console.log(data);
     this.statedata=data.state_wise;
      console.log(this.statedata);
      for(let [key,value] of Object.entries(this.statedata))
      {
        console.log('key ->' + key)
        if(key==='Tamil Nadu')
        {
          this.Confiremd = Number(value.confirmed);
            this.Recovered = Number(value.recovered);
            this.Death = Number(value.deaths);
             this.NewConfiremd = Number(value.deltaconfirmed);
             this.NewRecovered = Number(value.deltarecovered);
             this.NewDeath = Number(value.deltadeaths);
           this.ActiveCase = Number(value.active);
          //  this.NewActive =this.responsestatedata[0].aChanges;
             this.pieChartData=[];
             this.pieChartData.push(this.Confiremd);
             this.pieChartData.push(this.Recovered);
             this.pieChartData.push(this.Death);
        }
        console.log (value);
      }
    
      this.pieChartData.push(this.ActiveCase);
     
      console.log(this.responsestatedata);
    })
    
  }

  reqStatedata():Observable<any>{
  
   // return this.http.get<any>("https://api.covidindiatracker.com/state_data.json").pipe(retry(2),catchError((error:HttpErrorResponse)=>{
   return this.http.get<any>("https://corona-virus-world-and-india-data.p.rapidapi.com/api_india"
   ,{headers:{'x-rapidapi-key':'7a27db3e98mshff4950a33f9a138p162a2fjsn30277af48f8e',
  'x-rapidapi-host':'corona-virus-world-and-india-data.p.rapidapi.com'}})
   
   .pipe(retry(2),catchError((error:HttpErrorResponse)=>{
     
   let err="";
      if(error.error instanceof ErrorEvent)
      {
        err=`error of ${error.error.message}`;
      }
      else{
        err = `Error Status: ${error.status}\nMessage: ${error.message}`;
      }
      window.alert(err);
      return throwError(err);
    }))
  }
   

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
