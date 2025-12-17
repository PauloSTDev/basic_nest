import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user-dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/update-put-user-dto copy";
import { UpdatePatchUserDTO } from "./dto/update-patch-user-dto";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}


    async create({name, email, password, birthAt}: CreateUserDTO) {
        return this.prisma.user.create({
            data: { name, email, password, birthAt: birthAt ? new Date(birthAt) : null },
            select: { name: true, email: true, id: true }
        });
    }

    async listAll() {
        return this.prisma.user.findMany({
            select: {name: true, email: true }
        });
    }

    async getUserById(id: number) {
        return this.prisma.user.findUnique({
            where: { id },
            select: {  name: true, email: true}
        });
    }

    async updateUser(id: number, {email, name, password, birthAt}: UpdatePutUserDTO) {
        await this.userExists(id);

        return this.prisma.user.update({
            where: { id },
            data: {email, name, password, birthAt: birthAt ? new Date(birthAt) : null},
            select: { name: true, email: true }
        });
    }

    async updateUserPartial(id: number, {email, name, password, birthAt}: UpdatePatchUserDTO) {
        await this.userExists(id);
       
        const data: any = {};
        if (birthAt) data.birthAt = new Date(birthAt);
        if (email) data.email = email;
        if (name) data.name = name;
        if (password) data.password = password;
        console.log(data);

        return this.prisma.user.update({
            where: { id },
            data: data,
            select: { name: true, email: true }
        });
    }

    async deleteUserById(id: number) {
        await this.userExists(id);
        return this.prisma.user.delete({
            where: { id }
        });
    }


    async userExists(id: number) {
        if (!(await this.getUserById(id))){
            throw new NotFoundException('User not found');
        }
    }
}