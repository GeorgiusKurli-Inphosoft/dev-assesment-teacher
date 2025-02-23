import "reflect-metadata";
import { DataSource, Repository } from "typeorm";
import { Student } from "../entites/student";
import { StudentRepository } from "../repositories/student-repository";
import { v4 as uuidv4 } from "uuid";

let testDataSource: DataSource;
let studentRepository: StudentRepository;
let repo: Repository<Student>;

const studentEmail1 = "studentjon@gmail.com";
const studentId1 = uuidv4();
const studentEmail2 = "studenthon@gmail.com";
const studentId2 = uuidv4();
const uninsertedStudentEmail1 = "studentjohn@gmail.com";
const uninsertedStudentEmail2 = "studentbon@gmail.com";

beforeAll(async () => {
  testDataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [Student],
    synchronize: true,
    logging: false,
  });
  await testDataSource.initialize();

  studentRepository = new StudentRepository(testDataSource);
  repo = testDataSource.getRepository(Student);

  // seed data
  await repo.insert({ id: studentId1, email: studentEmail1 });
  await repo.insert({ id: studentId2, email: studentEmail2 });
});

afterAll(async () => {
  await testDataSource.destroy();
});

describe("Student Repository Function Test Using SQLite In-Memory DB", () => {
  it("should find multiple existing student by ids", async () => {
    const student = await studentRepository.findByIds([studentId1, studentId2]);
    expect(student).not.toBeNull();
    expect(student).toHaveLength(2);
    expect(student[0]).toBeInstanceOf(Student);
    expect(student[1]).toBeInstanceOf(Student);
  });

  it("should find multiple existing student by emails", async () => {
    const student = await studentRepository.findByEmails([
      studentEmail1,
      studentEmail2,
    ]);
    expect(student).not.toBeNull();
    expect(student).toHaveLength(2);
    expect(student[0]).toBeInstanceOf(Student);
    expect(student[1]).toBeInstanceOf(Student);
  });

  it("should fail creation if student already exists", async () => {
    const insertSpy = jest.spyOn(repo, "insert");

    const student = await studentRepository.createIfNotExist([studentEmail1]);

    expect(insertSpy).toHaveBeenCalledTimes(0);
    expect(student).not.toBeNull();
    expect(student[0].email).toBe(studentEmail1);
  });

  it("should create student if not exist", async () => {
    const insertSpy = jest.spyOn(repo, "insert");

    const student = await studentRepository.createIfNotExist([
      uninsertedStudentEmail1,
      uninsertedStudentEmail2,
    ]);

    expect(insertSpy).toHaveBeenCalled();
    expect(insertSpy).toHaveBeenCalledTimes(1);
    expect(student).not.toBeNull();
    expect(student[0]).toBeInstanceOf(Student);
    expect(student[1]).toBeInstanceOf(Student);
  });
});
