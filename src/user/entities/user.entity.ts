// profile.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Auth } from 'src/auth/entities/auth.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;
  @OneToOne(() => Auth, auth => auth.profile)
  @JoinColumn()
  auth: Auth;
}
