import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})

export class TimeFormatPipe implements PipeTransform {
  transform(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
}
