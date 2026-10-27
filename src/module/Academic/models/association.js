import ClassLevel from './classLevel.model.js';
import Course from './course.model.js';
import Lesson from './lesson.model.js';
import Module from './module.model.js';
import SubModule from './subModule.model.js';
import ModuleProgress from './moduleProgress.model.js';
import SubmoduleProgress from './subModuleProgress.model.js';
import StudentProfile from '../../auth/models/studentProfile.model.js';
import QuizQuestion from './quizQuestion.model.js';
import QuizOption from './quizOption.model.js';
import Enrollment from './enrollment.model.js';

// StudentProfile → Enrollment
StudentProfile.hasOne(Enrollment, { foreignKey: "studentId", as: "enrollment"});
Enrollment.belongsTo(StudentProfile, {foreignKey: "studentId", as: "student"});

// ClassLevel → Enrollment
ClassLevel.hasMany(Enrollment, {foreignKey: "classLevelId", as: "enrollments"});
Enrollment.belongsTo(ClassLevel, {foreignKey: "classLevelId", as: "classLevel"});


// Course → Lessons
Course.hasMany(Lesson, { foreignKey: 'courseId', as: 'lessons' });
Lesson.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

// ClassLevel → Lessons
ClassLevel.hasMany(Lesson, { foreignKey: 'classLevelId', as: 'lessons' });
Lesson.belongsTo(ClassLevel, { foreignKey: 'classLevelId', as: 'classLevel' });

// Lesson → Modules
Lesson.hasMany(Module, { foreignKey: 'lessonId', as: 'modules' });
Module.belongsTo(Lesson, { foreignKey: 'lessonId', as: 'lesson' });

// Module → Submodules
Module.hasMany(SubModule, { foreignKey: 'moduleId', as: 'submodules' });
SubModule.belongsTo(Module, { foreignKey: 'moduleId', as: 'module' });

// Student → Module (progress)
StudentProfile.belongsToMany(Module, {through: ModuleProgress, foreignKey: 'studentId', otherKey: 'moduleId', as: 'moduleProgress'});
Module.belongsToMany(StudentProfile, {through: ModuleProgress, foreignKey: 'moduleId', otherKey: 'studentId',as: 'students'
});

ModuleProgress.belongsTo(StudentProfile, { foreignKey: 'studentId', as: 'student' });
ModuleProgress.belongsTo(Module, { foreignKey: 'moduleId', as: 'module' });

//Student → Submodule (progress)
StudentProfile.belongsToMany(SubModule, {through: SubmoduleProgress, foreignKey: 'studentId', otherKey: 'submoduleId', as: 'submoduleProgress'});

SubModule.belongsToMany(StudentProfile, {through: SubmoduleProgress,foreignKey: 'submoduleId', otherKey: 'studentId', as: 'students'});

SubmoduleProgress.belongsTo(StudentProfile, { foreignKey: 'studentId', as: 'student' });
SubmoduleProgress.belongsTo(SubModule, { foreignKey: 'submoduleId', as: 'submodule' });

// Submodule (quiz) → QuizQuestion
SubModule.hasMany(QuizQuestion, { foreignKey: 'submoduleId', as: 'quizQuestions' });
QuizQuestion.belongsTo(SubModule, { foreignKey: 'submoduleId', as: 'submodule' });

//QuizQuestion → QuizOption
QuizQuestion.hasMany(QuizOption, { foreignKey: 'questionId', as: 'options' });
QuizOption.belongsTo(QuizQuestion, { foreignKey: 'questionId', as: 'question' });