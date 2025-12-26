import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';
import { RoleController } from './role.controller';
import { ApikeyController } from './apikey.controller';
import { LoggerController } from './logger.controller';
import { PaymentController } from './payment.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.AUTH_SERVICE_HOST || '0.0.0.0',
          port: parseInt(process.env.AUTH_SERVICE_PORT || '3007'),
        },
      },
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.USER_SERVICE_HOST || '0.0.0.0',
          port: parseInt(process.env.USER_SERVICE_PORT || '3006'),
        },
      },
      {
        name: 'APIKEY_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 3004,
        },
      },
      {
        name: 'LOGGER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 3005,
        },
      },
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 3003,
        },
      },
    ]),
  ],
  controllers: [AppController, AuthController, UserController, RoleController, ApikeyController, LoggerController, PaymentController],
  providers: [AppService],
})
export class AppModule { }
