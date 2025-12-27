import { Controller, Get, Post, Put, Delete, Body, Param, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('education')
export class EducationController {
    constructor(@Inject('EDUCATION_SERVICE') private readonly educationClient: ClientProxy) { }

    // --- Courses ---

    @Get('courses')
    async getCourses() {
        return firstValueFrom(this.educationClient.send('get_courses', {}));
    }

    @Get('courses/:id')
    async getCourse(@Param('id') id: string) {
        return firstValueFrom(this.educationClient.send('get_course', id));
    }

    @Post('courses')
    async createCourse(@Body() data: any) {
        return firstValueFrom(this.educationClient.send('create_course', data));
    }

    @Put('courses/:id')
    async updateCourse(@Param('id') id: string, @Body() data: any) {
        return firstValueFrom(this.educationClient.send('update_course', { id, data }));
    }

    @Delete('courses/:id')
    async deleteCourse(@Param('id') id: string) {
        return firstValueFrom(this.educationClient.send('delete_course', id));
    }

    // --- Lecturers ---

    @Get('lecturers')
    async getLecturers() {
        return firstValueFrom(this.educationClient.send('get_lecturers', {}));
    }

    @Post('lecturers')
    async createLecturer(@Body() data: any) {
        return firstValueFrom(this.educationClient.send('create_lecturer', data));
    }

    // --- Enrollments ---

    @Get('enrollments')
    async getEnrollments(@Query('userId') userId?: string) {
        return firstValueFrom(this.educationClient.send('get_enrollments', userId || ''));
    }

    @Post('enrollments')
    async enrollUser(@Body() { userId, courseId }: { userId: string, courseId: string }) {
        return firstValueFrom(this.educationClient.send('enroll_user', { userId, courseId }));
    }

    // --- Quizzes ---

    @Get('quizzes/:courseId')
    async getQuizzes(@Param('courseId') courseId: string) {
        return firstValueFrom(this.educationClient.send('get_quizzes', courseId));
    }
}
