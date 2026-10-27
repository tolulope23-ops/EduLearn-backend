import { EnrollmentService } from "../service/enrollment.service.js";

export class EnrollmentController{
    /**
     * @param {EnrollmentService} studentEnrollService
    */

    constructor(studentEnrollService){
        this.studentEnrollService = studentEnrollService
    }

    //Enroll a student
    enrollStudent = async (req, res, next) => {
        try {
            const userId = req.user.userId;
            console.log(userId);
            
            const { classLevel, courseNames, dailyGoals } = req.body;

            const enrollment = await this.studentEnrollService.enrollStudent(
                userId,
                {
                    classLevel,
                    courseNames,
                    dailyGoals,
                }
            );

            return res.status(201).json({
                success: true,
                message: "Student onboarded successfully",
                data: enrollment,
            });
        } catch (error) {
            next(error);
        };
    };

    // Get all courses for a student
    getAllStudentCourses = async (req, res, next) => {
        try {
            const { userId } = req.user;

            const courses = await this.studentEnrollService.getStudentEnrolledCoursesAndCount(userId);

            return res.status(200).json({
                message: "Courses retrieved successfully",
                data: {
                    courses: courses.courseNames,
                    count: courses.countCourses
                }
            });
        } catch (error) {
            next(error);
        };
    };
};