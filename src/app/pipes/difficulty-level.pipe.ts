import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'difficultyLevel'
})
export class DifficultyLevelPipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 1:
        return 'beginner';
      case 2:
        return 'intermediate';
      case 3:
        return 'expert';
      default:
        return 'Unknown';
    }
  }
}
