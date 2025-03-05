import { RegisterRepository } from "../repositories/register-repository";
import { v4 as uuidv4 } from "uuid";
import { db } from "../db-test";
import {
  register,
  student,
  StudentEntityType,
  teacher,
  TeacherEntityType,
} from "../entities";

const registerRepository = new RegisterRepository(db);

const studentId1 = uuidv4();
const studentId2 = uuidv4();
const teacherId1 = uuidv4();
const teacherId2 = uuidv4();

beforeAll(async () => {
  // seed teacher data
  await db.insert(teacher).values({
    id: teacherId1,
    email: "teacherEmail1@test.com",
  } as TeacherEntityType);
  await db.insert(teacher).values({
    id: teacherId2,
    email: "teacherEmail2@test.com",
  } as TeacherEntityType);

  // seed student data
  await db.insert(student).values({
    id: studentId1,
    email: "studentemail1@test.com",
  } as StudentEntityType);
  await db.insert(student).values({
    id: studentId2,
    email: "studentemail2@test.com",
  } as StudentEntityType);

  // seed register data
  await db
    .insert(register)
    .values({ studentId: studentId1, teacherId: teacherId1 });
  await db
    .insert(register)
    .values({ studentId: studentId2, teacherId: teacherId1 });
  await db
    .insert(register)
    .values({ studentId: studentId2, teacherId: teacherId2 });
});

afterAll(async () => {
  await db.delete(register);
  await db.delete(student);
  await db.delete(teacher);
});

describe("Register Repository Function Test", () => {
  it("should find common student id based on 2 teacher ids", async () => {
    const currentRegister = await registerRepository.getCommonStudentsByTeacher([
      teacherId1,
      teacherId2,
    ]);
    expect(currentRegister).not.toBeNull();
    expect(currentRegister).toHaveLength(1);
    expect(currentRegister[0]).toBe(studentId2);
  });

  it("should find common student id based on 1 teacher id", async () => {
    const currentRegister = await registerRepository.getCommonStudentsByTeacher([
      teacherId1,
    ]);
    expect(currentRegister).not.toBeNull();
    expect(currentRegister).toHaveLength(2);
    expect(currentRegister[0]).toBeTruthy();
    expect(currentRegister[1]).toBeTruthy();
  });

  it("should skip creation if register already exists", async () => {
    const currentRegister = await registerRepository.create(teacherId1, [
      studentId1,
      studentId2,
    ]);

    expect(currentRegister).not.toBeNull();
    expect(currentRegister).toHaveLength(0);
  });

  it("should create register if not exist", async () => {
    const currentRegister = await registerRepository.create(teacherId2, [studentId1]);

    expect(currentRegister).not.toBeNull();
    expect(currentRegister).toHaveLength(1);
    expect(currentRegister[0].studentId).toBe(studentId1);
    expect(currentRegister[0].teacherId).toBe(teacherId2);
  });
});
