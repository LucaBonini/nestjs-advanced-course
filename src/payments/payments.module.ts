import { Module } from '@nestjs/common';
import { PaymentWebhookController } from './payment-webhook.controller';
import { NotificationsService } from './notifications.service';
import { SubscriptionsService } from './subscriptions.service';
import { EventContext } from './context/event-context';

@Module({
  controllers: [PaymentWebhookController],
  providers: [NotificationsService, SubscriptionsService, EventContext],
})
export class PaymentsModule {}
