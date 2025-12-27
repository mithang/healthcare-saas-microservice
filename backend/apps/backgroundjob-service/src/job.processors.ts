import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { PrismaService } from './prisma.service';

@Processor('file')
export class FileProcessor {
    constructor(private prisma: PrismaService) { }

    @Process()
    async handleFileJob(job: Job) {
        await this.updateJobStatus(job.id.toString(), 'PROCESSING');

        try {
            // Simulate file processing
            console.log('Processing file:', job.data);
            await new Promise(resolve => setTimeout(resolve, 2000));

            await this.updateJobStatus(job.id.toString(), 'COMPLETED', { processed: true });
            return { success: true };
        } catch (error) {
            await this.updateJobStatus(job.id.toString(), 'FAILED', null, error.message);
            throw error;
        }
    }

    private async updateJobStatus(jobId: string, status: string, result?: any, error?: string) {
        await this.prisma.backgroundJob.update({
            where: { jobId },
            data: {
                status: status as any,
                result,
                error,
                ...(status === 'PROCESSING' && { startedAt: new Date() }),
                ...(status === 'COMPLETED' && { completedAt: new Date() }),
            },
        });
    }
}

@Processor('email')
export class EmailProcessor {
    constructor(private prisma: PrismaService) { }

    @Process()
    async handleEmailJob(job: Job) {
        await this.updateJobStatus(job.id.toString(), 'PROCESSING');

        try {
            console.log('Sending email:', job.data);
            await new Promise(resolve => setTimeout(resolve, 1500));

            await this.updateJobStatus(job.id.toString(), 'COMPLETED', { sent: true });
            return { success: true };
        } catch (error) {
            await this.updateJobStatus(job.id.toString(), 'FAILED', null, error.message);
            throw error;
        }
    }

    private async updateJobStatus(jobId: string, status: string, result?: any, error?: string) {
        await this.prisma.backgroundJob.update({
            where: { jobId },
            data: {
                status: status as any,
                result,
                error,
                ...(status === 'PROCESSING' && { startedAt: new Date() }),
                ...(status === 'COMPLETED' && { completedAt: new Date() }),
            },
        });
    }
}

@Processor('sms')
export class SmsProcessor {
    constructor(private prisma: PrismaService) { }

    @Process()
    async handleSmsJob(job: Job) {
        await this.updateJobStatus(job.id.toString(), 'PROCESSING');

        try {
            console.log('Sending SMS:', job.data);
            await new Promise(resolve => setTimeout(resolve, 1000));

            await this.updateJobStatus(job.id.toString(), 'COMPLETED', { sent: true });
            return { success: true };
        } catch (error) {
            await this.updateJobStatus(job.id.toString(), 'FAILED', null, error.message);
            throw error;
        }
    }

    private async updateJobStatus(jobId: string, status: string, result?: any, error?: string) {
        await this.prisma.backgroundJob.update({
            where: { jobId },
            data: {
                status: status as any,
                result,
                error,
                ...(status === 'PROCESSING' && { startedAt: new Date() }),
                ...(status === 'COMPLETED' && { completedAt: new Date() }),
            },
        });
    }
}

@Processor('notification')
export class NotificationProcessor {
    constructor(private prisma: PrismaService) { }

    @Process()
    async handleNotificationJob(job: Job) {
        await this.updateJobStatus(job.id.toString(), 'PROCESSING');

        try {
            console.log('Sending notification:', job.data);
            await new Promise(resolve => setTimeout(resolve, 1000));

            await this.updateJobStatus(job.id.toString(), 'COMPLETED', { sent: true });
            return { success: true };
        } catch (error) {
            await this.updateJobStatus(job.id.toString(), 'FAILED', null, error.message);
            throw error;
        }
    }

    private async updateJobStatus(jobId: string, status: string, result?: any, error?: string) {
        await this.prisma.backgroundJob.update({
            where: { jobId },
            data: {
                status: status as any,
                result,
                error,
                ...(status === 'PROCESSING' && { startedAt: new Date() }),
                ...(status === 'COMPLETED' && { completedAt: new Date() }),
            },
        });
    }
}

@Processor('scheduled')
export class ScheduledProcessor {
    constructor(private prisma: PrismaService) { }

    @Process()
    async handleScheduledJob(job: Job) {
        await this.updateJobStatus(job.id.toString(), 'PROCESSING');

        try {
            console.log('Executing scheduled job:', job.data);
            await new Promise(resolve => setTimeout(resolve, 1500));

            await this.updateJobStatus(job.id.toString(), 'COMPLETED', { executed: true });
            return { success: true };
        } catch (error) {
            await this.updateJobStatus(job.id.toString(), 'FAILED', null, error.message);
            throw error;
        }
    }

    private async updateJobStatus(jobId: string, status: string, result?: any, error?: string) {
        await this.prisma.backgroundJob.update({
            where: { jobId },
            data: {
                status: status as any,
                result,
                error,
                ...(status === 'PROCESSING' && { startedAt: new Date() }),
                ...(status === 'COMPLETED' && { completedAt: new Date() }),
            },
        });
    }
}
