// src/donations/donations.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Donation } from './donation.entity';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { DonationReportDto, DonorInfoDto } from './dto/donation-report.dto';

@Injectable()
export class DonationsService {
  constructor(
    @InjectRepository(Donation)
    private donationRepository: Repository<Donation>,
  ) {}

  async createDonation(
    createDonationDto: CreateDonationDto,
  ): Promise<Donation> {
    const donation = this.donationRepository.create(createDonationDto);
    return this.donationRepository.save(donation);
  }

  async findAll(): Promise<Donation[]> {
    // To include soft-deleted donations, use withDeleted()
    return this.donationRepository.find({
      where: { deletedAt: IsNull() },
      order: { donationDate: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Donation> {
    const donation = await this.donationRepository.findOne({ where: { id } });
    if (!donation) {
      throw new NotFoundException(`Donation #${id} not found`);
    }
    return donation;
  }

  async updateDonation(
    id: number,
    updateDto: UpdateDonationDto,
  ): Promise<Donation> {
    const donation = await this.findOne(id);
    Object.assign(donation, updateDto);
    return this.donationRepository.save(donation);
  }

  // Soft delete
  async deleteDonation(id: number): Promise<void> {
    const donation = await this.findOne(id);
    await this.donationRepository.softRemove(donation);
  }

  // Donation Reports
  async getDonationReport(): Promise<DonationReportDto> {
    const totalDonors = await this.donationRepository
      .createQueryBuilder('donation')
      .select('COUNT(DISTINCT donation.mobileNumber)', 'count')
      .where('donation.deletedAt IS NULL')
      .getRawOne();

    const totalAmount = await this.donationRepository
      .createQueryBuilder('donation')
      .select('SUM(donation.amount)', 'sum')
      .where('donation.deletedAt IS NULL')
      .getRawOne();

    return {
      totalDonors: parseInt(totalDonors.count, 10),
      totalAmount: parseFloat(totalAmount.sum) || 0,
    };
  }

  async getDonorInfos(): Promise<DonorInfoDto[]> {
    const donorInfos = await this.donationRepository
      .createQueryBuilder('donation')
      .select('donation.mobileNumber', 'mobileNumber')
      .addSelect('MAX(donation.donorName)', 'donorName') // Using MAX to select a representative name
      .addSelect('SUM(donation.amount)', 'totalAmount')
      .where('donation.deletedAt IS NULL')
      .groupBy('donation.mobileNumber')
      .getRawMany();

    return donorInfos.map((info) => ({
      donorName: info.donorName,
      mobileNumber: info.mobileNumber,
      totalAmount: parseFloat(info.totalAmount) || 0,
    }));
  }
}
