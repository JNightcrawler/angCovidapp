import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  constructor(private route:Router) { }

  formsTest= new FormGroup({
    username: new FormControl('deepak'),
    email:new FormControl('')
  });
  ngOnInit(): void {
  }
  onsubmit():void {
    if(this.formsTest.value.username!=='' && this.formsTest.value.email!== '')
    this.route.navigate(['/main'])
    else{
      alert('please enter the details')
    }
  }

}
