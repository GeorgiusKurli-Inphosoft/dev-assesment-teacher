import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRegister1739982826814 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE register (
        id VARCHAR(32) DEFAULT (uuid()),
        teacher_id VARCHAR(32) NOT NULL,
        student_id VARCHAR(32) NOT NULL,
        PRIMARY KEY (id),
        CONSTRAINT unique_map UNIQUE (teacher_id, student_id),
        FOREIGN KEY fk_teacher (teacher_id) REFERENCES teacher (id),
        FOREIGN KEY fk_student (student_id) REFERENCES student (id));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("register");
  }
}
