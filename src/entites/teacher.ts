import { PrimaryGeneratedColumn, Column } from "typeorm";

export class Teacher {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string;

  @Column({ unique: true })
  email: string;
}
