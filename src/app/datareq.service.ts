import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { response } from "./mainpage/Response";

@Injectable({
  providedIn: 'root'
})
export class DatareqService {

  public hasdone = new BehaviorSubject<boolean>(true);
  cast =this.hasdone.asObservable();

  constructor(private http:HttpClient) { 

    console.log('in serev')
  }
  getdone():Observable<boolean>{
    return this.hasdone;
  }
  getnotify(isdone){
    this.hasdone.next(isdone);
  }
  /*getsummary():Observable<response>{
    return this.http.get<response>('https://api.covid19api.com/summary')
  }*/
}
