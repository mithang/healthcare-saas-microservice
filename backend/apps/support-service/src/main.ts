import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { SupportModule } from './support.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(SupportModule, {
        transport: Transport.RMQ,
        options: {
            urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
            queue: 'support_queue',
            queueOptions: {
                durable: false
            },
        },
    });
    await app.listen();
}
bootstrap();
