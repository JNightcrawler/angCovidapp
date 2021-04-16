import { Pipe, PipeTransform } from '@angular/core';
import { countries } from "./mainpage/countries";

@Pipe({
  name: 'filtertable'
})
export class FiltertablePipe implements PipeTransform {

  transform(value: countries[], search:string): countries[] {
    if(value!== null && search!== undefined) {
    console.log('in pipes');
    console.log(search)
    if(search ===''){
      return value;
    }else {
      const count:countries[]=[]
      return value.filter(value=>
        value.Country.trim().toLowerCase().startsWith(search.trim().toLowerCase(),0)=== true);
    }
    //return null;
  }else{
    return value;
  }
  }

}
