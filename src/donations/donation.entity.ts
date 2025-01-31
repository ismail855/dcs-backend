// src/donations/donation.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  Check,
} from 'typeorm';

@Entity()
@Check(`"amount" > 0`) // Ensures amount is positive
@Check(`"mobileNumber" ~ '^[0-9]{11}$'`) // Ensures mobileNumber is exactly 11 digits
export class Donation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  donorName: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  mobileNumber: string;

  @Column()
  message: string;

  // Donation date column
  @CreateDateColumn()
  donationDate: Date;

  // Soft delete column
  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
