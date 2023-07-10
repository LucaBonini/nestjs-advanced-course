import { IntervalHost } from '../scheduler/decorators/interval-host.decorator';
import { interval } from '../scheduler/decorators/interval.decorator';

@IntervalHost
export class CronService {
  @interval(10000)
  everySecond() {
    console.log('this will run every 10 second');
  }
}
