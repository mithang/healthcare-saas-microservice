import { Controller, Get, Post, Put, Delete, Body, Param, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('content')
export class ContentController {
    constructor(@Inject('CONTENT_SERVICE') private readonly contentClient: ClientProxy) { }

    // Posts
    @Get('posts')
    async getPosts() {
        return firstValueFrom(this.contentClient.send('getPosts', {}));
    }

    @Get('posts/:id')
    async getPost(@Param('id') id: string) {
        return firstValueFrom(this.contentClient.send('getPost', parseInt(id)));
    }

    @Post('posts')
    async createPost(@Body() data: any) {
        return firstValueFrom(this.contentClient.send('createPost', data));
    }

    @Put('posts/:id')
    async updatePost(@Param('id') id: string, @Body() data: any) {
        return firstValueFrom(this.contentClient.send('updatePost', { id: parseInt(id), postData: data }));
    }

    @Delete('posts/:id')
    async deletePost(@Param('id') id: string) {
        return firstValueFrom(this.contentClient.send('deletePost', parseInt(id)));
    }

    // Categories
    @Get('categories')
    async getCategories() {
        return firstValueFrom(this.contentClient.send('getCategories', {}));
    }

    @Post('categories')
    async createCategory(@Body() data: { name: string }) {
        return firstValueFrom(this.contentClient.send('createCategory', data));
    }

    @Delete('categories/:id')
    async deleteCategory(@Param('id') id: string) {
        return firstValueFrom(this.contentClient.send('deleteCategory', parseInt(id)));
    }

    // Banners
    @Get('banners')
    async getBanners() {
        return firstValueFrom(this.contentClient.send('getBanners', {}));
    }

    @Post('banners')
    async createBanner(@Body() data: any) {
        return firstValueFrom(this.contentClient.send('createBanner', data));
    }

    @Delete('banners/:id')
    async deleteBanner(@Param('id') id: string) {
        return firstValueFrom(this.contentClient.send('deleteBanner', parseInt(id)));
    }

    // Videos
    @Get('videos')
    async getVideos() {
        return firstValueFrom(this.contentClient.send('getVideos', {}));
    }

    @Post('videos')
    async createVideo(@Body() data: any) {
        return firstValueFrom(this.contentClient.send('createVideo', data));
    }

    @Delete('videos/:id')
    async deleteVideo(@Param('id') id: string) {
        return firstValueFrom(this.contentClient.send('deleteVideo', parseInt(id)));
    }

    // Static Pages
    @Get('pages')
    async getStaticPages() {
        return firstValueFrom(this.contentClient.send('getStaticPages', {}));
    }

    @Post('pages')
    async createStaticPage(@Body() data: any) {
        return firstValueFrom(this.contentClient.send('createStaticPage', data));
    }

    @Put('pages/:id')
    async updateStaticPage(@Param('id') id: string, @Body() data: any) {
        return firstValueFrom(this.contentClient.send('updateStaticPage', { id: parseInt(id), pageData: data }));
    }

    @Delete('pages/:id')
    async deleteStaticPage(@Param('id') id: string) {
        return firstValueFrom(this.contentClient.send('deleteStaticPage', parseInt(id)));
    }

    // Q&A
    @Get('questions')
    async getQuestions() {
        return firstValueFrom(this.contentClient.send('getQuestions', {}));
    }

    @Delete('questions/:id')
    async deleteQuestion(@Param('id') id: string) {
        return firstValueFrom(this.contentClient.send('deleteQuestion', parseInt(id)));
    }

    @Post('questions/:id/answers')
    async addAnswer(@Param('id') id: string, @Body() data: any) {
        return firstValueFrom(this.contentClient.send('addAnswer', { questionId: parseInt(id), answerData: data }));
    }

    // Topics
    @Get('topics')
    async getTopics() {
        return firstValueFrom(this.contentClient.send('getTopics', {}));
    }

    @Delete('topics/:id')
    async deleteTopic(@Param('id') id: string) {
        return firstValueFrom(this.contentClient.send('deleteTopic', parseInt(id)));
    }

    // Comments
    @Get('comments')
    async getComments(@Query('targetId') targetId: string, @Query('targetType') targetType: string) {
        if (targetId && targetType) {
            return firstValueFrom(this.contentClient.send('getComments', { targetId, targetType }));
        }
        return firstValueFrom(this.contentClient.send('getAllComments', {}));
    }

    @Post('comments')
    async createComment(@Body() data: any) {
        return firstValueFrom(this.contentClient.send('createComment', data));
    }

    @Delete('comments/:id')
    async deleteComment(@Param('id') id: string) {
        return firstValueFrom(this.contentClient.send('deleteComment', parseInt(id)));
    }

    // Top Search
    @Get('top-searches')
    async getTopSearches() {
        return firstValueFrom(this.contentClient.send('getTopSearches', {}));
    }
}
