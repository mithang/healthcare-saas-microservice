import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EngagementService } from './engagement.service';
import { CommentStatus } from '.prisma/client-engagement-service';

@Controller()
export class EngagementController {
    constructor(private readonly engagementService: EngagementService) { }

    @MessagePattern({ cmd: 'getComments' })
    getComments() {
        return this.engagementService.getComments();
    }

    @MessagePattern({ cmd: 'updateCommentStatus' })
    updateCommentStatus(payload: { id: number, status: CommentStatus }) {
        return this.engagementService.updateCommentStatus(payload.id, payload.status);
    }

    @MessagePattern({ cmd: 'getCommentStats' })
    getCommentStats() {
        return this.engagementService.getCommentStats();
    }
}
