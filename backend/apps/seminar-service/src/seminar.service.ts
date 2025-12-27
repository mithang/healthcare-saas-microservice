import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma';

@Injectable()
export class SeminarService implements OnModuleInit {
    constructor(private readonly prisma: PrismaService) {}

    async onModuleInit() {    }

    // --- Seminars ---
    async getSeminars() {
        return this.prisma.seminar.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                banners: true,
                sessions: true,
                attendees: true,
            }
        });
    }

    async getSeminarById(id: number) {
        return this.prisma.seminar.findUnique({
            where: { id },
            include: {
                banners: true,
                sessions: true,
                attendees: true,
            }
        });
    }

    async createSeminar(data: any) {
        return this.prisma.seminar.create({ data });
    }

    async updateSeminar(id: number, data: any) {
        return this.prisma.seminar.update({
            where: { id },
            data,
        });
    }

    async deleteSeminar(id: number) {
        return this.prisma.seminar.delete({
            where: { id },
        });
    }

    // --- Banners ---
    async getBanners() {
        return this.prisma.seminarBanner.findMany({
            include: { seminar: true }
        });
    }

    async createBanner(data: any) {
        return this.prisma.seminarBanner.create({ data });
    }

    async deleteBanner(id: number) {
        return this.prisma.seminarBanner.delete({ where: { id } });
    }

    // --- Attendees ---
    async getAttendees(seminarId?: number) {
        if (seminarId) {
            return this.prisma.seminarAttendee.findMany({
                where: { seminarId }
            });
        }
        return this.prisma.seminarAttendee.findMany();
    }

    async createAttendee(data: any) {
        return this.prisma.seminarAttendee.create({ data });
    }

    async updateAttendee(id: number, data: any) {
        return this.prisma.seminarAttendee.update({
            where: { id },
            data,
        });
    }

    async deleteAttendee(id: number) {
        return this.prisma.seminarAttendee.delete({ where: { id } });
    }

    // --- Invitations ---
    async getInvitations() {
        return this.prisma.seminarInvitation.findMany({
            include: { seminar: true }
        });
    }

    async createInvitation(data: any) {
        return this.prisma.seminarInvitation.create({ data });
    }

    // --- Sessions ---
    async getSessions() {
        return this.prisma.seminarSession.findMany({
            include: { seminar: true }
        });
    }

    async createSession(data: any) {
        return this.prisma.seminarSession.create({ data });
    }

    async updateSession(id: number, data: any) {
        return this.prisma.seminarSession.update({
            where: { id },
            data,
        });
    }

    async deleteSession(id: number) {
        return this.prisma.seminarSession.delete({ where: { id } });
    }

    // --- Speakers ---
    async getSpeakers() {
        return this.prisma.seminarSpeaker.findMany();
    }

    async createSpeaker(data: any) {
        return this.prisma.seminarSpeaker.create({ data });
    }

    async updateSpeaker(id: number, data: any) {
        return this.prisma.seminarSpeaker.update({
            where: { id },
            data,
        });
    }

    async deleteSpeaker(id: number) {
        return this.prisma.seminarSpeaker.delete({ where: { id } });
    }
}
