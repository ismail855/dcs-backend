// src/donations/donations.controller.ts

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { DonationReportDto, DonorInfoDto } from './dto/donation-report.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.entity';
import { Donation } from './donation.entity';

@Controller('donations')
export class DonationsController {
  constructor(private donationsService: DonationsService) {}

  @Post()
  async createDonation(@Body() createDonationDto: CreateDonationDto) {
    return this.donationsService.createDonation(createDonationDto);
  }

  // Donation Reports - Protected Routes
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('report/summary')
  async getDonationReport(): Promise<DonationReportDto> {
    return this.donationsService.getDonationReport();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('report/donors')
  async getDonorInfos(): Promise<DonorInfoDto[]> {
    return this.donationsService.getDonorInfos();
  }

  // Donation History - Provide all donations without filtering
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('history')
  async getAllDonations(): Promise<Donation[]> {
    return this.donationsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async findAll() {
    return this.donationsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.donationsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  async updateDonation(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDonationDto: UpdateDonationDto,
  ) {
    return this.donationsService.updateDonation(id, updateDonationDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async deleteDonation(@Param('id', ParseIntPipe) id: number) {
    return this.donationsService.deleteDonation(id);
  }
}
