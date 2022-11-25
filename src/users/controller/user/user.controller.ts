import {
  Controller,
  Get,
  Body,
  Post,
  Put,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

const client = new PrismaClient();

@Controller('user')
export class UserController {
  @Get()
  async getAllUsers() {
    let data = await client.user.findMany();
    return { data };
  }

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    return await client.user.create({ data: userData });
  }

  @Put('/:id')
  async updateUser(
    @Body() userData: CreateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await client.user.update({
      where: { id },
      data: userData,
    });
  }

  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await client.user.delete({
      where: { id },
    });
  }
}
