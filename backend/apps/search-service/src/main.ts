import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { SearchModule } from './search.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        SearchModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
                queue: 'search_queue',
                queueOptions: {
                    durable: false,
                },
            },
        },
    );
    await app.listen();
}
bootstrap();
