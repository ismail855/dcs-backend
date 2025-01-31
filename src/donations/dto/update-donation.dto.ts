// src/donations/dto/update-donation.dto.ts

import { IsOptional, IsNumber, Min, IsString, Matches } from 'class-validator';

export class UpdateDonationDto {
  @IsOptional()
  @IsString({ message: 'Donor name must be a string.' })
  donorName?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Amount must be a number.' })
  @Min(1, { message: 'Amount must be greater than 0.' })
  amount?: number;

  @IsOptional()
  @IsString({ message: 'Message must be a string.' })
  message?: string;

  @IsOptional()
  @IsString({ message: 'Mobile number must be a string.' })
  @Matches(/^\d{11}$/, { message: 'Mobile number must be exactly 11 digits.' })
  mobileNumber?: string;
}
