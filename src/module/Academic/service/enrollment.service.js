import { RecordNotFoundError } from "../../../common/error/domainError.error.js";
import { StudentProfileRepository } from "../../auth/repository/studentProfile.repository.js";
import { ClassLevelRepository } from "../repository/classLevel.repository.js";
import { CourseRepository } from "../repository/course.repository.js";
import { EnrollmentRepository } from "../repository/enrollemt.repository.js";

export class EnrollmentService {
    /**
     * @param {StudentProfileRepository} studentProfileRepo 
     * @param {CourseRepository} coursesRepo
     * @param {ClassLevelRepository} classLevelRepo
     * @param {EnrollmentRepository} enrollmentRepo
     */

    constructor(studentProfileRepo, coursesRepo, classLevelRepo, enrollmentRepo){
        this.studentProfileRepo = studentProfileRepo;
        this.coursesRepo = coursesRepo;
        this.classLevelRepo = classLevelRepo;
        this.enrollmentRepo = enrollmentRepo;
    };

    async enrollStudent(userId, {classLevel, courseNames, dailyGoals}){
        //find the student's profile using the authenticated user's Id.
        const student = await this.studentProfileRepo.getProfileByUserId(userId)

        if (!student) {
            throw new RecordNotFoundError("Student's profile not found");
        };

        //Prevent duplicate enrollment records for the same student.
        const existingEnrollment = await this.enrollmentRepo.getEnrollmentByStudentId(student.id);

        if (existingEnrollment) {
            throw new Error("Student is already enrolled");
        };

        //Find the requested class level.
        const level = await this.classLevelRepo.getClassLevelByName(classLevel);

        if (!level) {
            throw new RecordNotFoundError("Class level not found");
        };

        // Validate the requested courses.
        if (!Array.isArray(courseNames) || courseNames.length === 0) {
            throw new Error("At least one course must be selected");
        };

        const courses = await this.coursesRepo.getCoursesByNames(courseNames);

        if (!courses || courses.length !== courseNames.length) {
            throw new RecordNotFoundError("Invalid student course");
        };
        
        //Extract course IDs and reject duplicate selections.
        const courseIds = courses.map((course) => course.id);

        if (new Set(courseIds).size !== courseIds.length) {
            throw new Error("Duplicate courses are not allowed");
        };

        //Create the enrollment record.
        return await this.enrollmentRepo.enrollStudent({
            studentId: student.id,
            classLevelId: level.id,
            courseIds,
            dailyGoal: dailyGoals,
        });
    };

    async getStudentEnrollment(userId){
        const student = await this.studentProfileRepo.getProfileByUserId(userId);
        if (!student) {
            throw new RecordNotFoundError("Student profile not found");
        };

        const studentEnrollment = await this.enrollmentRepo.getEnrollmentByStudentId(student.id);
        if (!studentEnrollment) {
            throw new RecordNotFoundError("Student enrollment not found");
        };

        return {
            studentId: student.id,
            classLevelId: studentEnrollment.classLevelId,
            courseIds: studentEnrollment.courseIds
        };
    };

    async getStudentEnrolledCoursesAndCount(userId){
        //get the courses the student enrolled in 
        const {courseIds} = await this.getStudentEnrollment(userId);

        //retrieve the corresponding course details
        const courses = await this.coursesRepo.getCoursesByIds(courseIds);

        //extract the name of the courses
        const courseNames = courses.map(c => c.name);

        return {
            courseNames,
            countCourses: courses.length
        };
    };
};