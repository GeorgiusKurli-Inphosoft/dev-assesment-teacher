import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity("register")
export class Register {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({name: "student_id"})
  studentId: string;

  @Column({name: "teacher_id"})
  teacherId: string;
}
