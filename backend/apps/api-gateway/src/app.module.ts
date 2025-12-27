import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';
import { RoleController } from './role.controller';
import { ApikeyController } from './apikey.controller';
import { LoggerController } from './logger.controller';
import { PaymentController } from './payment.controller';
import { FileController } from './file.controller';
import { SettingController } from './setting.controller';
import { SearchController } from './search.controller';
import { BackgroundJobController } from './backgroundjob.controller';
import { ContentController } from './content.controller';
import { EducationController } from './education.controller';
import { PartnerController } from './partner.controller';
import { CommunityController } from './community.controller';
import { BookingController } from './booking.controller';
import { MarketingController } from './marketing.controller';
import { FinanceController } from './finance.controller';
import { SeminarController } from './seminar.controller';
import { ReportController } from './report.controller';
import { SurveyController } from './survey.controller';
import { AIController } from './ai.controller';
import { AnalyticController } from './analytic.controller';
import { EngagementController } from './engagement.controller';
import { GamificationController } from './gamification.controller';
import { LiveController } from './live.controller';
import { SupportController } from './support.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'auth_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'user_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'APIKEY_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'apikey_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'LOGGER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'logger_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'payment_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'FILE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'file_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'notification_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'SETTING_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'setting_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'SEARCH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'search_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'BACKGROUNDJOB_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'backgroundjob_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'COMMUNITY_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'community_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'BOOKING_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'booking_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'EDUCATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'education_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'PARTNER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'partner_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'MARKETING_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'marketing_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'FINANCE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'finance_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'SEMINAR_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'seminar_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'REPORT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'report_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'SURVEY_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'survey_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'AI_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'ai_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'ANALYTIC_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'analytic_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'ENGAGEMENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'engagement_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'GAMIFICATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'gamification_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'LIVE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'live_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'SUPPORT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'support_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AppController, AuthController, UserController, RoleController, ApikeyController, LoggerController, PaymentController, FileController, SettingController, SearchController, BackgroundJobController, ContentController, EducationController, PartnerController, CommunityController, BookingController, MarketingController, FinanceController, SeminarController, ReportController, SurveyController, AIController, AnalyticController, EngagementController, GamificationController, LiveController, SupportController],
  providers: [AppService],
})
export class AppModule { }
