import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user-dto";
import { UpdatePutUserDTO } from "./dto/update-put-user-dto copy";
import { UpdatePatchUserDTO } from "./dto/update-patch-user-dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    // CREATE

    @Post()
    async createUser(@Body() data: CreateUserDTO) {
        return this.userService.create(data);
    }

    // READ
    @Get()
    async list() {
        return this.userService.listAll();
    }

    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUserById(id);
    }

    // UPDATE
    @Put(':id')
    async update(@Body() data: UpdatePutUserDTO, @Param('id', ParseIntPipe) id: number) {
       return  this.userService.updateUser(id, data);
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number) {
        return this.userService.updateUserPartial(id, data);
    }

    // DELETE
    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUserById(id);
    }
}