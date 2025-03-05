import { teacher } from "../entities";
import { TeacherRepository } from "../repositories/teacher-repository";
import { db } from "../db-test";
import { inArray } from "drizzle-orm";

const teacherRepository = new TeacherRepository(db);

const teacherEmail1 = "teacherken@gmail.com";
const teacherEmail2 = "teacherken2@gmail.com";
const uninsertedTeacherEmail = "teacherjohn@gmail.com";

beforeAll(async () => {
  // seed data
  await db.insert(teacher).values({ email: teacherEmail1 });
  await db.insert(teacher).values({ email: teacherEmail2 });
});

afterAll(async () => {
  await db
    .delete(teacher)
    .where(
      inArray(teacher.email, [
        teacherEmail1,
        teacherEmail2,
        uninsertedTeacherEmail,
      ])
    );
});

describe("Teacher Repository Function Test", () => {
  it("should return null if teacher is not found", async () => {
    const currentTeacher = await teacherRepository.findByEmail("test@test.com");
    expect(currentTeacher).toBeUndefined();
  });

  it("should find an existing teacher by email", async () => {
    const currentTeacher = await teacherRepository.findByEmail(teacherEmail1);
    expect(currentTeacher).not.toBeNull();
    expect(currentTeacher?.email).toBe(teacherEmail1);
  });

  it("should find multiple existing teacher by emails", async () => {
    const currentTeacher = await teacherRepository.findByEmails([
      teacherEmail1,
      teacherEmail2,
    ]);
    expect(currentTeacher).toHaveLength(2);
    expect(currentTeacher[0]).toBeTruthy();
    expect(currentTeacher[1]).toBeTruthy();
  });

  it("should skip creation if teacher already exists", async () => {
    const currentTeacher = await teacherRepository.createIfNotExist(
      teacherEmail1
    );

    expect(currentTeacher).not.toBeNull();
    expect(currentTeacher?.email).toBe(teacherEmail1);
  });

  it("should create teacher if not exist", async () => {
    const currentTeacher = await teacherRepository.createIfNotExist(
      uninsertedTeacherEmail
    );

    expect(currentTeacher).not.toBeNull();
    expect(currentTeacher?.email).toBe(uninsertedTeacherEmail);
  });
});
