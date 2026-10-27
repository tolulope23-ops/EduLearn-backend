import Course from '../models/course.model.js';
import { handleSequelizeError } from "../../../common/error/sequeliseError.error.js";
import { Op } from 'sequelize';


export class CourseRepository{
  // READ QUERY OPERATIONS
    async getCourseById(id) {
        try {
            const course = await Course.findByPk(id);
            return course ? this.mapToCourseEntity(course) : null;
        } catch (error) {
            handleSequelizeError(error);
        }
    };

    async getAllCourses() {
        try {
            const courses = await Course.findAll();
            return courses.map(course => this.mapToCourseEntity(course));
        } catch (error) {
            handleSequelizeError(error);
        }
    };

    async getCourseByName(name) {
        try {
            const course = await Course.findOne({
                where: {
                    name: {
                        [Op.like]: name
                    }
                }
            });

            return course ? this.mapToCourseEntity(course) : null;
        } catch (error) {
            handleSequelizeError(error);
        }
    };

    async getCoursesByNames(names) {
        try {
            const courses = await Course.findAll({
                where: { name: names } // Sequelize does an IN query
            });

            return courses.map(course => this.mapToCourseEntity(course));
        } catch (error) {
            handleSequelizeError(error);
        }
    };

    async getCoursesByIds(Ids) {
        try {
            const courses = await Course.findAll({
                where: { id: Ids } // Sequelize does an IN query
            });

            return courses.map(course => this.mapToCourseEntity(course));
        } catch (error) {
            handleSequelizeError(error);
        }
    };

// HELPER: Map Sequelize instance to domain entity
    mapToCourseEntity(course) {
        if (!course) return null;

        return {
            id: course.id,
            name: course.name,
            createdAt: course.createdAt,
            updatedAt: course.updatedAt,
        };
    };

};