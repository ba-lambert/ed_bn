import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity()
export class Auth {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column({ unique: true })
    username:string;
    @Column()
    password:string;
    @BeforeInsert()
  generateUUID() {
    this.id = uuid();
  }
}
