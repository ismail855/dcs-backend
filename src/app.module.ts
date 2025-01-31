import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../typeorm.config';
import { AuthModule } from './auth/auth.module';
import { DonationsModule } from './donations/donations.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UsersModule,
    DonationsModule,
  ],
})
export class AppModule {}
