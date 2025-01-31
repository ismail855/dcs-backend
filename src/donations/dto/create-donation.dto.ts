// src/donations/dto/create-donation.dto.ts

import { IsNotEmpty, IsNumber, Min, IsString, Matches } from 'class-validator';

export class CreateDonationDto {
  @IsNotEmpty({ message: 'Donor name is required.' })
  @IsString({ message: 'Donor name must be a string.' })
  donorName: string;

  @IsNumber({}, { message: 'Amount must be a number.' })
  @Min(1, { message: 'Amount must be greater than 0.' })
  amount: number;

  @IsNotEmpty({ message: 'Mobile number is required.' })
  @IsString({ message: 'Mobile number must be a string.' })
  @Matches(/^\d{11}$/, { message: 'Mobile number must be exactly 11 digits.' })
  mobileNumber: string;

  @IsString({ message: 'Message must be a string.' })
  message: string;
}
