import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alterarLetras',
})
export class AlterarLetrasPipe implements PipeTransform {

  transform(value: string, ...args) {
    return value.toLowerCase();
  }
}
