import { Pipe, PipeTransform } from '@angular/core';
import { RateCode } from '../services/timetable.service';

@Pipe({
  name: 'rate'
})
export class RatePipe implements PipeTransform {

  transform(value: RateCode, ...args: unknown[]): unknown {
    switch (value) {
      case RateCode.g:
        return '普遍級';
      case RateCode.pg:
        return '保護級';
      case RateCode.pg12:
        return '輔導級12';
      case RateCode.pg15:
        return '輔導級15';
      case RateCode.r:
        return '限制級';
      default:
        return '';
    }
  }

}
