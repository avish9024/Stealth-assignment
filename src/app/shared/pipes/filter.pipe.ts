import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '../../models/product';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(array: Product[], text: string): any {
    if (!array) return [];
    if (!text) return array;

    return array.filter((item) => {
      return item.name.toLowerCase().includes(text.toLowerCase());
    });
  }

}
