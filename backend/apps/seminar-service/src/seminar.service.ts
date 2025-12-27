import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SeminarService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    // --- Seminars ---
    async getSeminars() {
        return this.seminar.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                banners: true,
                sessions: true,
                attendees: true,
            }
        });
    }

    async getSeminarById(id: number) {
        return this.seminar.findUnique({
            where: { id },
            include: {
                banners: true,
                sessions: true,
                attendees: true,
            }
        });
    }

    async createSeminar(data: any) {
        return this.seminar.create({ data });
    }

    async updateSeminar(id: number, data: any) {
        return this.seminar.update({
            where: { id },
            data,
        });
    }

    async deleteSeminar(id: number) {
        return this.seminar.delete({
            where: { id },
        });
    }

    // --- Banners ---
    async getBanners() {
        return this.seminarBanner.findMany({
            include: { seminar: true }
        });
    }

    async createBanner(data: any) {
        return this.seminarBanner.create({ data });
    }

    async deleteBanner(id: number) {
        return this.seminarBanner.delete({ where: { id } });
    }

    // --- Attendees ---
    async getAttendees(seminarId?: number) {
        if (seminarId) {
            return this.seminarAttendee.findMany({
                where: { seminarId }
            });
        }
        return this.seminarAttendee.findMany();
    }

    async createAttendee(data: any) {
        return this.seminarAttendee.create({ data });
    }

    async updateAttendee(id: number, data: any) {
        return this.seminarAttendee.update({
            where: { id },
            data,
        });
    }

    async deleteAttendee(id: number) {
        return this.seminarAttendee.delete({ where: { id } });
    }

    // --- Invitations ---
    async getInvitations() {
        return this.seminarInvitation.findMany({
            include: { seminar: true }
        });
    }

    async createInvitation(data: any) {
        return this.seminarInvitation.create({ data });
    }

    // --- Sessions ---
    async getSessions() {
        return this.seminarSession.findMany({
            include: { seminar: true }
        });
    }

    async createSession(data: any) {
        return this.seminarSession.create({ data });
    }

    async updateSession(id: number, data: any) {
        return this.seminarSession.update({
            where: { id },
            data,
        });
    }

    async deleteSession(id: number) {
        return this.seminarSession.delete({ where: { id } });
    }

    // --- Speakers ---
    async getSpeakers() {
        return this.seminarSpeaker.findMany();
    }

    async createSpeaker(data: any) {
        return this.seminarSpeaker.create({ data });
    }

    async updateSpeaker(id: number, data: any) {
        return this.seminarSpeaker.update({
            where: { id },
            data,
        });
    }

    async deleteSpeaker(id: number) {
        return this.seminarSpeaker.delete({ where: { id } });
    }
}
