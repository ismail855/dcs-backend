import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('admin')
  async createAdmin(
    @Body() body: { email: string; password: string; mobileNumber: string },
  ) {
    return this.usersService.createAdminUser(
      body.email,
      body.password,
      parseInt(body.mobileNumber),
    );
  }

  @Post()
  async createUser(
    @Body() body: { email: string; password: string; mobileNumber: string },
  ) {
    return this.usersService.createUser(
      body.email,
      body.password,
      parseInt(body.mobileNumber),
    );
  }
}
