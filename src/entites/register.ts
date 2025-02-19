import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity("register")
export class Register {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string;

  @Column()
  studentId: string;

  @
}
