import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity("student")
export class Teacher {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string;

  @Column({ unique: true })
  email: string;
}
