import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { data } from "./data";
import { ChartDataSets, ChartOptions } from 'chart.js';
import { DatareqService } from '../datareq.service';

@Component({
  selector: 'app-ngbarline',
  templateUrl: './ngbarline.component.html',
  styleUrls: ['./ngbarline.component.css']
})
export class NgbarlineComponent implements OnInit {

  public result:Date[];
  public resultdate:any[];
  public apidata:data;
  public label = [];
  public today:Date= new Date();
  public todayConfirmed:Number;
  public todayRecover:Number;
  public todayActive:Number;
  public todayDeath:Number;
  public isDataAvble:boolean=false;
  public loader:string='block';
  public loadit:boolean=true;
  constructor(private http:HttpClient,private service:DatareqService) 
  { 
   this.service.cast.subscribe(hasload =>this.loadit = hasload);
    this.apidata=null;
  this.getlast5();
  this.sendreq(4);
  this.label.length=0;
  this.isDataAvble=true;
  setTimeout(()=>{
    this.loader ='none';
  },3000)

  this.service.getnotify(this.loadit);
  }

  ngOnInit(): void {

  }
  public opts = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales:{
      yAxes:[{
        scaleLabel:{

        },
        ticks: {
        
           // Return an empty string to draw the tick line but hide the tick label
           // Return `null` or `undefined` to hide the tick line entirely
           userCallback: function(value, index, values) {
              // Convert the number to a string and splite the string every 3 charaters from the end
              // value = value.toString();
              // value = value.split(/(?=(?:...)*$)/);
              
              // // Convert the array to a string and format the output
              // value = value.join('.');
              var num =value;

              if (num >= 1000000000) {
                return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
             }
             if (num >= 1000000) {
                return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
             }
             if (num >= 1000) {
                return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
             }
             // return '€' + value;
            }
          }
      }]
    }
  };
  public charttype = 'bar';
  public legd= true;
  
   public datas = [
    {data: [], label: ''},
   
  ];

  public lineChartData: ChartDataSets[] = [
    { data: [], label: '' }
  ];
  public lineChartLabels: Label[] = [];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public date;
 


  public getlast5():void
  {
     this.result=[];
     this.resultdate=[];
     for(let i=0;i<5;i++)
     {
      this.date=new Date();
       this.date.setDate(this.date.getDate()-i);
       console.log(this.date);
      
       let iMoth:Number  = this.date.getMonth()+1;
       let iDay:Number = this.date.getUTCDate();
       
       let sMoth:string;
       let sDay:string;
       if(iMoth.toString().length==1)
       {
           sMoth='0'+iMoth.toString();
       }else{
       sMoth = iMoth.toString();
       }
       if(iDay.toString().length==1)
       {
        sDay='0'+iDay.toString();
       }else{
       sDay =  iDay.toString();
       }
 
       var fuldate = this.date.getFullYear()+'-'+sMoth+'-'+sDay;
       console.log('date - -'+fuldate);
       this.resultdate.push(fuldate);
       this.result.push(this.date);
     }
 
   }
   public sendreq(icount:number):void
   {
     
       this.http.get<any>('https://covid-api.com/api/reports/total?date='+this.resultdate[icount]).toPromise().then
       (data=>{
         this.apidata=data;
         console.log(this.apidata);
         console.log('test--'+this.apidata.data.date);
         var date1 =new Date(this.apidata.data.date);
         const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
          const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts( date1) ;

      console.log(`${month}-${year }`)
      var shortdte= `${day}-${month }`;
         this.label.push(shortdte);
        
        // let vals = this.nFormatter(this.apidata.data.confirmed);
        this.datas[0].data.push(this.apidata.data.confirmed);
        this.datas[0].label='Confirmed Cases'
        this.lineChartLabels.push(shortdte);
       
        if(icount===1){
          this.todayConfirmed=this.apidata.data.confirmed;
          this.todayRecover=this.apidata.data.recovered;
          this.todayActive=this.apidata.data.active;
          this.todayDeath=this.apidata.data.deaths;
        }
        //let vals2=this.nFormatter(this.apidata.data.recovered);
        this.lineChartData[0].data.push(this.apidata.data.recovered);
         icount--;
         if(icount==0){
           return;
         }else{
           this.sendreq(icount);
 
         }
       });
   }
   

    nFormatter(num) {
    if (num >= 1000000000) {
       return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (num >= 1000000) {
       return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
       return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
  }

}
