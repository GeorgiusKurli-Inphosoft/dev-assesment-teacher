import { AppDataSource } from "../data-source";
import { Register } from "src/entites/register";
import { InsertResult } from "typeorm";

export class RegisterRepository {
  private studentRepository = AppDataSource.getRepository(Register);

  async create(studentId: string, teacherId: string): Promise<InsertResult> {
    return this.studentRepository.insert({ studentId, teacherId });
  }
}
