import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity("teacher")
export class Teacher {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;
}
