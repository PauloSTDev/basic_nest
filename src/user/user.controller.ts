import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user-dto";
import { UpdatePutUserDTO } from "./dto/update-put-user-dto copy";

@Controller('users')
export class UserController {

    // CREATE
    @Post()
    async createUser(@Body() {email, name, password}, body: CreateUserDTO) {
        return { email, name, password, body, message: 'User created successfully' };
    }

    // READ
    @Get()
    async list() {
        return [];
    }

    @Get(':id')
    async getOne(@Param('id') param) {
        return {user:{}, param};
    }

    // UPDATE
    @Put(':id')
    async update(@Body() {email, name, password},body: UpdatePutUserDTO, @Param() params) {
        return {method: 'PUT', message: 'User updated successfully', email, name, password, params};
    }

    @Patch(':id')
    async updatePartial(@Body() body, @Param() params) {
        return {method: 'PATCH', message: 'User updated successfully', body, params};
    }

    // DELETE
    @Delete(':id')
    async deleteUser(@Param() params) {
        return {method: 'DELETE', message: 'User deleted successfully', params};
    }
}