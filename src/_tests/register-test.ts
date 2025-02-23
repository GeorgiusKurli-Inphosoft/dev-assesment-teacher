import "reflect-metadata";
import { DataSource, Repository } from "typeorm";
import { Register } from "../entites/register";
import { RegisterRepository } from "../repositories/register-repository";
import { v4 as uuidv4 } from "uuid";

let testDataSource: DataSource;
let registerRepository: RegisterRepository;
let repo: Repository<Register>;

const studentId1 = uuidv4();
const studentId2 = uuidv4();
const teacherId1 = uuidv4();
const teacherId2 = uuidv4();

beforeAll(async () => {
  testDataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [Register],
    synchronize: true,
    logging: false,
  });
  await testDataSource.initialize();

  registerRepository = new RegisterRepository(testDataSource);
  repo = testDataSource.getRepository(Register);

  // seed data
  await repo.insert({ studentId: studentId1, teacherId: teacherId1 });
  await repo.insert({ studentId: studentId2, teacherId: teacherId1 });
  await repo.insert({ studentId: studentId2, teacherId: teacherId2 });
});

afterAll(async () => {
  await testDataSource.destroy();
});

describe("Register Repository Function Test Using SQLite In-Memory DB", () => {
  it("should find common student id based on 2 teacher ids", async () => {
    const register = await registerRepository.getCommonStudentsByTeacher([
      teacherId1,
      teacherId2,
    ]);
    expect(register).not.toBeNull();
    expect(register).toHaveLength(1);
    expect(register[0]).toBe(studentId2);
  });

  it("should find common student id based on 1 teacher id", async () => {
    const register = await registerRepository.getCommonStudentsByTeacher([
      teacherId1,
    ]);
    expect(register).not.toBeNull();
    expect(register).toHaveLength(2);
    expect(register[0]).toBeTruthy();
    expect(register[1]).toBeTruthy();
  });

  it("should skip creation if register already exists", async () => {
    const insertSpy = jest.spyOn(repo, "insert");

    const register = await registerRepository.create(teacherId1, [
      studentId1,
      studentId2,
    ]);

    expect(insertSpy).toHaveBeenCalledTimes(0);
    expect(register).not.toBeNull();
    expect(register).toHaveLength(0);
  });

  it("should create register if not exist", async () => {
    const insertSpy = jest.spyOn(repo, "insert");

    const register = await registerRepository.create(teacherId2, [studentId1]);

    expect(insertSpy).toHaveBeenCalled();
    expect(insertSpy).toHaveBeenCalledTimes(1);
    expect(register).not.toBeNull();
    expect(register).toHaveLength(1);
    expect(register[0].studentId).toBe(studentId1);
    expect(register[0].teacherId).toBe(teacherId2);
  });
});
