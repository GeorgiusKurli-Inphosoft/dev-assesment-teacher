import { StudentRepository } from "../repositories/student-repository";
import { v4 as uuidv4 } from "uuid";
import { db } from "../db-test";
import { student, StudentEntityType } from "../entities";
import { inArray } from "drizzle-orm";

const studentRepository = new StudentRepository(db);

const studentEmail1 = "studentjon@gmail.com";
const studentId1 = uuidv4();
const studentEmail2 = "studenthon@gmail.com";
const studentId2 = uuidv4();
const uninsertedStudentEmail1 = "studentjohn@gmail.com";
const uninsertedStudentEmail2 = "studentbon@gmail.com";

beforeAll(async () => {
  // seed data
  await db.insert(student).values({
    id: studentId1,
    email: studentEmail1,
  } as StudentEntityType);
  await db.insert(student).values({
    id: studentId2,
    email: studentEmail2,
  } as StudentEntityType);
});

afterAll(async () => {
  await db.delete(student).where(inArray(student.id, [studentId1, studentId2]));
});

describe("Student Repository Function Test", () => {
  it("should find multiple existing student by ids", async () => {
    const currentStudent = await studentRepository.findByIds([
      studentId1,
      studentId2,
    ]);
    expect(currentStudent).not.toBeNull();
    expect(currentStudent).toHaveLength(2);
    expect(currentStudent[0]).toBeTruthy();
    expect(currentStudent[1]).toBeTruthy();
  });

  it("should find multiple existing student by emails", async () => {
    const currentStudent = await studentRepository.findByEmails([
      studentEmail1,
      studentEmail2,
    ]);
    expect(currentStudent).not.toBeNull();
    expect(currentStudent).toHaveLength(2);
    expect(currentStudent[0]).toBeTruthy();
    expect(currentStudent[1]).toBeTruthy();
  });

  it("should skip creation if student already exists", async () => {
    const currentStudent = await studentRepository.createIfNotExist([
      studentEmail1,
    ]);

    expect(currentStudent).not.toBeNull();
    expect(currentStudent[0].email).toBe(studentEmail1);
  });

  it("should create student if not exist", async () => {
    const currentStudent = await studentRepository.createIfNotExist([
      uninsertedStudentEmail1,
      uninsertedStudentEmail2,
    ]);

    expect(currentStudent).not.toBeNull();
    expect(currentStudent[0]).toBeTruthy();
    expect(currentStudent[1]).toBeTruthy();
  });
});
