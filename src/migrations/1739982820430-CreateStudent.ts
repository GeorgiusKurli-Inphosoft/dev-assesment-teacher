import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStudent1739982820430 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE student (
        id VARCHAR(32) DEFAULT (uuid()),
        email TEXT NOT NULL,
        status ENUM('Active', 'Suspended') NOT NULL,
        PRIMARY KEY (id)
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("student");
  }
}
