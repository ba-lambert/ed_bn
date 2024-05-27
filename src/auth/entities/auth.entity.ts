import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn,OneToOne } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Role } from "../dto/create-auth.dto";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({
    type: "simple-array",
  })
  roles: Role[];
  @OneToOne(()=>User,profile => profile.auth)
  profile:User;
  
  @BeforeInsert()
  generateUUID() {
    this.id = uuid();
  }
}
