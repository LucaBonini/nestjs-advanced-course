import { Injectable } from '@nestjs/common';
import { I18nsService } from './i18ns/i18n.service';

@Injectable()
export class AppService {
  constructor(private readonly i18nsService: I18nsService) {}

  getHello(): string {
    return this.i18nsService.translate('ERRORS.USER_NOT_FOUND', {
      firstName: 'Luca',
    });
  }
}
