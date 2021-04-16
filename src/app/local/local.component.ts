import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { state } from './state';
import { statedata } from '../tndata/statedata';
import { SingleDataSet, Label } from 'ng2-charts';
import { ChartOptions } from 'chart.js';


@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit {

  constructor(private http:HttpClient) { }
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

  
  ngOnInit(): void {
   
    // this.req().toPromise().then(data=>{
    //   console.log(data);
    //   this.Response=data
    //   console.log('local data');
      
    // console.log(this.Response['Tamil Nadu']);
    // });

    this.reqStatedata().subscribe(data=> {
      this.responsestatedata=data
      this.responsestatedata= this.responsestatedata.filter((data)=>{
        return data.id == 'IN-TN'
      });
      this.Confiremd = this.responsestatedata[0].confirmed;
      this.Recovered = this.responsestatedata[0].recovered;
      this.Death = this.responsestatedata[0].deaths;
      this.NewConfiremd = this.responsestatedata[0].cChanges
      this.NewRecovered = this.responsestatedata[0].rChanges;
      this.NewDeath = this.responsestatedata[0].dChanges;
     this.ActiveCase = this.responsestatedata[0].active;
     this.NewActive =this.responsestatedata[0].aChanges;
      this.pieChartData=[];
      this.pieChartData.push(this.Confiremd);
      this.pieChartData.push(this.Recovered);
      this.pieChartData.push(this.Death);
      this.pieChartData.push(this.ActiveCase);
     
      console.log(this.responsestatedata);
    })
    
  }

  reqStatedata():Observable<any>{
  
    return this.http.get<any>("https://api.covidindiatracker.com/state_data.json").pipe(retry(2),catchError((error:HttpErrorResponse)=>{
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
