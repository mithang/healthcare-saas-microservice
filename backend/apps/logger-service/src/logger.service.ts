import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/common';
import { LogLevel } from '@prisma/client';

@Injectable()
export class LoggerService {
  constructor(private prisma: PrismaService) { }

  async log(level: LogLevel, message: string, category: string) {
    return this.prisma.log.create({
      data: {
        level,
        message,
        category,
      },
    });
  }

  async getLogs(filter: {
    level?: LogLevel;
    category?: string;
    startDate?: Date;
    endDate?: Date;
  }) {
    const where: any = {};
    if (filter.level) where.level = filter.level;
    if (filter.category) where.category = filter.category;
    if (filter.startDate || filter.endDate) {
      where.timestamp = {};
      if (filter.startDate) where.timestamp.gte = filter.startDate;
      if (filter.endDate) where.timestamp.lte = filter.endDate;
    }

    return this.prisma.log.findMany({
      where,
      orderBy: {
        timestamp: 'desc',
      },
    });
  }
}
