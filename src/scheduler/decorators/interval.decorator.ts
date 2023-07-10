import { SetMetadata } from '@nestjs/common';

export const INTERVAL_KEY = 'INTERVAL_KEY';

export const interval = (ms: number) => SetMetadata(INTERVAL_KEY, ms);
