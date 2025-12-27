import { Controller, Get, Post, Put, Delete, Body, Param, Query, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('seminars')
export class SeminarController {
    constructor(@Inject('SEMINAR_SERVICE') private readonly client: ClientProxy) { }

    // --- Seminars ---
    @Get()
    getSeminars() {
        return this.client.send({ cmd: 'get_seminars' }, {});
    }

    @Get(':id')
    getSeminarById(@Param('id') id: string) {
        return this.client.send({ cmd: 'get_seminar_by_id' }, parseInt(id));
    }

    @Post()
    createSeminar(@Body() data: any) {
        return this.client.send({ cmd: 'create_seminar' }, data);
    }

    @Put(':id')
    updateSeminar(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_seminar' }, { id: parseInt(id), data });
    }

    @Delete(':id')
    deleteSeminar(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_seminar' }, parseInt(id));
    }

    // --- Banners ---
    @Get('banners')
    getBanners() {
        return this.client.send({ cmd: 'get_seminar_banners' }, {});
    }

    @Post('banners')
    createBanner(@Body() data: any) {
        return this.client.send({ cmd: 'create_seminar_banner' }, data);
    }

    @Delete('banners/:id')
    deleteBanner(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_seminar_banner' }, parseInt(id));
    }

    // --- Attendees ---
    @Get('attendees')
    getAttendees(@Query('seminarId') seminarId?: string) {
        return this.client.send({ cmd: 'get_seminar_attendees' }, seminarId ? parseInt(seminarId) : undefined);
    }

    @Post('attendees')
    createAttendee(@Body() data: any) {
        return this.client.send({ cmd: 'create_seminar_attendee' }, data);
    }

    @Put('attendees/:id')
    updateAttendee(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_seminar_attendee' }, { id: parseInt(id), data });
    }

    @Delete('attendees/:id')
    deleteAttendee(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_seminar_attendee' }, parseInt(id));
    }

    // --- Invitations ---
    @Get('invitations')
    getInvitations() {
        return this.client.send({ cmd: 'get_seminar_invitations' }, {});
    }

    @Post('invitations')
    createInvitation(@Body() data: any) {
        return this.client.send({ cmd: 'create_seminar_invitation' }, data);
    }

    // --- Sessions ---
    @Get('sessions')
    getSessions() {
        return this.client.send({ cmd: 'get_seminar_sessions' }, {});
    }

    @Post('sessions')
    createSession(@Body() data: any) {
        return this.client.send({ cmd: 'create_seminar_session' }, data);
    }

    @Put('sessions/:id')
    updateSession(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_seminar_session' }, { id: parseInt(id), data });
    }

    @Delete('sessions/:id')
    deleteSession(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_seminar_session' }, parseInt(id));
    }

    // --- Speakers ---
    @Get('speakers')
    getSpeakers() {
        return this.client.send({ cmd: 'get_seminar_speakers' }, {});
    }

    @Post('speakers')
    createSpeaker(@Body() data: any) {
        return this.client.send({ cmd: 'create_seminar_speaker' }, data);
    }

    @Put('speakers/:id')
    updateSpeaker(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_seminar_speaker' }, { id: parseInt(id), data });
    }

    @Delete('speakers/:id')
    deleteSpeaker(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_seminar_speaker' }, parseInt(id));
    }
}
