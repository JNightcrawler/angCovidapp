import { Component, OnInit, Input } from '@angular/core';
import { DatareqService } from '../datareq.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

 
  public loadit:boolean;
  constructor(private service:DatareqService) { }

  ngOnInit(): void {
    this.service.cast.subscribe(hasdone=>this.loadit=hasdone);
    console.log('in spinner '+this.loadit);
  }

}
