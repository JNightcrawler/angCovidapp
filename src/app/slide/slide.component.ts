import { Component, OnInit } from '@angular/core';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faTasks } from "@fortawesome/free-solid-svg-icons";
import { faSuitcase } from "@fortawesome/free-solid-svg-icons";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { faTv } from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {

  constructor() { }

  fasicons = faBars;
  fahome = faHome;
  fatask =faTasks;
  fasuit =faSuitcase;
  fatag =faTags;
  fatv =faTv;

  ngOnInit(): void {
    this.item='login';
  }
item:string;
  onclickpage(page:string):void
  {
    this.item=page;
    console.log(page);
    //this.route.navigate(['cnav1/'+page]);
  }

}
