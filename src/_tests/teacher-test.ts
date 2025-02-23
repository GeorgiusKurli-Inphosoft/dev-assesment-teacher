import "reflect-metadata";
import { DataSource, Repository } from "typeorm";
import { Teacher } from "../entites/teacher";
import { TeacherRepository } from "../repositories/teacher-repository";

let testDataSource: DataSource;
let teacherRepository: TeacherRepository;
let repo: Repository<Teacher>;

const teacherEmail1 = "teacherken@gmail.com";
const teacherEmail2 = "teacherken2@gmail.com";
const uninsertedTeacherEmail = "teacherjohn@gmail.com";

beforeAll(async () => {
  testDataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [Teacher],
    synchronize: true,
    logging: false,
  });
  await testDataSource.initialize();

  teacherRepository = new TeacherRepository(testDataSource);
  repo = testDataSource.getRepository(Teacher);

  // seed data
  await repo.insert({ email: teacherEmail1 });
  await repo.insert({ email: teacherEmail2 });
});

afterAll(async () => {
  await testDataSource.destroy();
});

describe("Teacher Repository Function Test Using SQLite In-Memory DB", () => {
  it("should return null if teacher is not found", async () => {
    const teacher = await teacherRepository.findByEmail("test@test.com");
    expect(teacher).toBeNull();
  });

  it("should find an existing teacher by email", async () => {
    const teacher = await teacherRepository.findByEmail(teacherEmail1);
    expect(teacher).not.toBeNull();
    expect(teacher?.email).toBe(teacherEmail1);
  });

  it("should find multiple existing teacher by emails", async () => {
    const teacher = await teacherRepository.findByEmails([
      teacherEmail1,
      teacherEmail2,
    ]);
    expect(teacher).not.toBeNull();
    expect(teacher).toHaveLength(2);
    expect(teacher[0]).toBeInstanceOf(Teacher);
    expect(teacher[1]).toBeInstanceOf(Teacher);
  });

  it("should fail creation if teacher already exists", async () => {
    const insertSpy = jest.spyOn(repo, "save");

    const teacher = await teacherRepository.createIfNotExist(teacherEmail1);

    expect(insertSpy).toHaveBeenCalledTimes(0);
    expect(teacher).not.toBeNull();
    expect(teacher?.email).toBe(teacherEmail1);
  });

  it("should create teacher if not exist", async () => {
    const insertSpy = jest.spyOn(repo, "save");

    const teacher = await teacherRepository.createIfNotExist(
      uninsertedTeacherEmail
    );

    expect(insertSpy).toHaveBeenCalled();
    expect(insertSpy).toHaveBeenCalledTimes(1);
    expect(teacher).not.toBeNull();
    expect(teacher?.email).toBe(uninsertedTeacherEmail);
  });
});
