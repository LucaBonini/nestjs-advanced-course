import {
  ContextId,
  ContextIdFactory,
  ContextIdResolver,
  ContextIdResolverFn,
  ContextIdStrategy,
  HostComponentInfo,
} from '@nestjs/core';
import { Request } from 'express';
import { I18nsService } from '../i18ns/i18n.service';
import { pick } from 'accept-language-parser';

export class AggregateByLocaleContextIdStrategy implements ContextIdStrategy {
  private readonly locales = new Map<string, ContextId>();

  attach(
    contextId: ContextId,
    request: Request,
  ): ContextIdResolverFn | ContextIdResolver {
    const localCode = pick(
      I18nsService.supportedLanguages,
      request.headers['accept-language'],
    );

    let localeSubtreeId: ContextId;

    if (this.locales.has(localCode)) {
      localeSubtreeId = this.locales.get(localCode);
    } else {
      localeSubtreeId = ContextIdFactory.create();
      this.locales.set(localCode, localeSubtreeId);
      setTimeout(() => this.locales.delete(localCode), 3000);
    }

    return {
      payload: { localCode },
      resolve: (info: HostComponentInfo) => {
        console.log(info, 'info');
        console.log(localeSubtreeId, 'localeSubtreeId');
        return info.isTreeDurable ? localeSubtreeId : contextId;
      },
    };
  }
}
