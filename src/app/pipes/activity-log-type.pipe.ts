import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'intensityType'
})
export class ActivityLogTypePipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 1:
        return 'Low';
      case 2:
        return 'Moderate';
      case 3:
        return 'High';
      default:
        return 'Unknown';
    }
  }
}
