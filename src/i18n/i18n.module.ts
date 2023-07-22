import { Module } from '@nestjs/common';
import { I18nsService } from '../i18ns/i18n.service';

@Module({
  providers: [I18nsService],
  exports: [I18nsService],
})
export class I18nModule {}
