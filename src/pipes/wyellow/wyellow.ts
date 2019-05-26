import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the WyellowPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'transformaMinusculo',
})
export class WyellowPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value.toLowerCase();
  }
}
