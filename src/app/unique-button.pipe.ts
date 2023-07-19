import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uniqueButton'
})
export class UniqueButtonPipe implements PipeTransform {
  transform(value: any, label: string): any {
    const result = [];
    const map = new Map();
    for (const item of value) {
      if (!map.has(item[label])) {
        map.set(item[label], true);
        result.push(item);
      }
    }
    return result;
  }
}
