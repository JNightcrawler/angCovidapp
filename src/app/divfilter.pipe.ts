import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'divfilter'
})
export class DivfilterPipe implements PipeTransform {

  transform(value: Array<string>, search: string): Array<string> {
    if(search!== undefined && value!== null){
      if(search ===''){
        return value;
      }else {
      return value.filter(item=> item.toLowerCase().startsWith(search.toLowerCase(),0));
    }
  }else{
    return null;
    }
  }

}
