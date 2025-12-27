import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EducationService } from './education.service';

@Controller()
export class EducationController {
    constructor(private readonly educationService: EducationService) { }

    @MessagePattern('get_courses')
    getCourses() {
        return this.educationService.getCourses();
    }

    @MessagePattern('get_course')
    getCourse(@Payload() id: string) {
        return this.educationService.getCourse(id);
    }

    @MessagePattern('create_course')
    createCourse(@Payload() data: any) {
        return this.educationService.createCourse(data);
    }

    @MessagePattern('update_course')
    updateCourse(@Payload() { id, data }: { id: string, data: any }) {
        return this.educationService.updateCourse(id, data);
    }

    @MessagePattern('delete_course')
    deleteCourse(@Payload() id: string) {
        return this.educationService.deleteCourse(id);
    }

    @MessagePattern('get_lecturers')
    getLecturers() {
        return this.educationService.getLecturers();
    }

    @MessagePattern('create_lecturer')
    createLecturer(@Payload() data: any) {
        return this.educationService.createLecturer(data);
    }

    @MessagePattern('get_enrollments')
    getEnrollments(@Payload() userId?: string) {
        return this.educationService.getEnrollments(userId);
    }

    @MessagePattern('enroll_user')
    enrollUser(@Payload() { userId, courseId }: { userId: string, courseId: string }) {
        return this.educationService.enrollUser(userId, courseId);
    }

    @MessagePattern('get_quizzes')
    getQuizzes(@Payload() courseId: string) {
        return this.educationService.getQuizzes(courseId);
    }
}
