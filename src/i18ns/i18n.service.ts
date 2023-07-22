import { Inject, Injectable, Scope } from '@nestjs/common';
import * as it from '../assets/locales/it.json';
import * as en from '../assets/locales/en.json';
import type * as Schema from '../assets/locales/en.json';
import { REQUEST } from '@nestjs/core';
import format from 'string-format';

export type PathsToStringProps<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>];
    }[Extract<keyof T, string>];

type DD = PathsToStringProps<typeof Schema>;

type KeyOfSchema = keyof typeof Schema;
type TypeOfSchema = typeof Schema;
type ExtractTypeofSchema = Extract<keyof typeof Schema, string>;

type JoinPath = Join<PathsToStringProps<typeof Schema>>;

type Join<T extends string[]> = T extends []
  ? never
  : T extends [infer F]
  ? F
  : T extends [infer F, ...infer R]
  ? F extends string
    ? `${F}.${Join<Extract<R, string[]>>}`
    : never
  : string;

@Injectable({ scope: Scope.REQUEST, durable: true })
export class I18nsService {
  constructor(
    @Inject(REQUEST) private readonly payload: { localCode: string },
  ) {}

  public static readonly defaultLanguage = 'en';
  public static readonly supportedLanguages = ['en', 'it'];
  private readonly locales: Record<string, typeof Schema> = { en, it };

  translate(
    key: Join<PathsToStringProps<typeof Schema>>,
    ...args: Array<string | Record<string, unknown>>
  ): string {
    const locale =
      this.locales[this.payload.localCode ?? I18nsService.defaultLanguage];

    // ERRORS.USER_NOT_FOUND
    const text = key.split('.').reduce((acc, key) => acc[key], locale);

    return format(text, ...args);
  }
}
