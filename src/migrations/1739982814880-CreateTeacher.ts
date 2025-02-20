import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTeacher1739982814880 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE teacher (
        id VARCHAR(36) DEFAULT (uuid()),
        email VARCHAR(500) NOT NULL UNIQUE,
        PRIMARY KEY (id)
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("teacher");
  }
}
