import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_SERVICE, envs } from 'src/confing';
import { env } from 'process';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [
    NatsModule
  ]
})
export class OrdersModule {}
