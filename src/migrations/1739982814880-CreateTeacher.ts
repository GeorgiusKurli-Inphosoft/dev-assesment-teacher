import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTeacher1739982814880 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE teacher (
        id VARCHAR(32) DEFAULT (uuid()),
        email TEXT NOT NULL,
        PRIMARY KEY (id)
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("teacher");
  }
}
