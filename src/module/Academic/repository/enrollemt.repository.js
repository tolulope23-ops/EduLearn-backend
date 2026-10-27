import Enrollment from "../models/enrollment.model.js";
import { handleSequelizeError } from "../../../common/error/sequeliseError.error.js";
import { RecordNotFoundError } from "../../../common/error/domainError.error.js";

export class EnrollmentRepository {

    //Create enrollment data for new student
    async enrollStudent(data){
        try {
            const enroll = await Enrollment.create({
                studentId: data.studentId,
                dailyGoal: data.dailyGoal ?? null,
                classLevelId: data.classLevelId ?? null,
                courseIds: data.courseIds ?? [],
            });
            return this.mapToEnrollmentEntity(enroll);
        } catch (error) {
            throw handleSequelizeError(error);
        };
    };

    //Find the enrollment belonging to a student.
    async getEnrollmentByStudentId(studentId) {
        try {
            const enroll = await Enrollment.findOne({
                where: { studentId },
            });

         if (!enroll) {
            return null;
        };

        return this.mapToEnrollmentEntity(enroll);
        } catch (error) {
            handleSequelizeError(error);
        };
    };

    //Retrieve all student enrollments with pagination.
    async getAllEnrollments() {
        try {
            const { rows } = await Enrollment.findAndCountAll({
                order: [["createdAt", "DESC"]],
            });

            return {
                data: rows.map((enroll) =>
                    this.mapToEnrollmentEntity(enroll)
                ),
            };
        } catch (error) {
            throw handleSequelizeError(error);
        }
    };

    //Update an existing student's enrollment.
    async updateEnrollment(studentId, data) {
        try {
            const enroll = await Enrollment.findOne({
                where: { studentId },
            });

            if (!enroll) {
                throw new RecordNotFoundError("Student not enrolled");
            };

            // Only permit fields that can be updated.
            const updates = {};

            if (data.dailyGoal !== undefined) {
                updates.dailyGoal = data.dailyGoal;
            };

            if (data.classLevelId !== undefined) {
                updates.classLevelId = data.classLevelId;
            };

            if (data.courseIds !== undefined) {
                updates.courseIds = data.courseIds;
            };

            await enroll.update(updates);

            return this.mapToEnrollmentEntity(enroll);
        } catch (error) {
            throw handleSequelizeError(error);
        };
    };

  // HELPER: Map Sequelize instance to domain entity
  mapToEnrollmentEntity(enroll) {
    if (!enroll) return null;

    return {
        id: enroll.id,
        studentId: enroll.studentId,
        dailyGoal: enroll.dailyGoal,
        classLevelId: enroll.classLevelId ?? [],
        courseIds: enroll.courseIds,
        createdAt: enroll.createdAt,
        updatedAt: enroll.updatedAt,
    };
    };
};