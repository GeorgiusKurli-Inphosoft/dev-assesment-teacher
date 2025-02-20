import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { StudentStatus } from "../enums/student-status.enum";

@Entity("student")
export class Student {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column("enum", { enum: StudentStatus })
  status: StudentStatus;
}
