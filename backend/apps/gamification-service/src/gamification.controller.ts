import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GamificationService } from './gamification.service';

@Controller()
export class GamificationController {
    constructor(private readonly gamificationService: GamificationService) { }

    @MessagePattern({ cmd: 'getLeaderboard' })
    getLeaderboard() {
        return this.gamificationService.getLeaderboard();
    }

    @MessagePattern({ cmd: 'getBadges' })
    getBadges() {
        return this.gamificationService.getBadges();
    }

    @MessagePattern({ cmd: 'getPointRules' })
    getPointRules() {
        return this.gamificationService.getPointRules();
    }

    @MessagePattern({ cmd: 'getGamificationStats' })
    getGamificationStats() {
        return this.gamificationService.getGamificationStats();
    }

    @MessagePattern({ cmd: 'createBadge' })
    createBadge(data: any) {
        return this.gamificationService.createBadge(data);
    }

    @MessagePattern({ cmd: 'updatePointRule' })
    updatePointRule(payload: { id: number, points: number }) {
        return this.gamificationService.updatePointRule(payload.id, payload.points);
    }
}
