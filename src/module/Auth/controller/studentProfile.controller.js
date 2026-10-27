import { StudentProfileService } from "../service/studentProfile.service.js";

export class StudentProfileController {
    /**
     * @param {StudentProfileService} studentProfileService
     */

    constructor(studentProfileService){
        this.studentProfileService = studentProfileService;
    };

//CREATE PROFILE
    createStudentProfile = async (req, res, next) => {
        try {
            const profile = await this.studentProfileService.createStudentProfile(req.body);

        return res.status(201).json({
            success: true,
            message: 'Student profile created successfully',
            data: profile
        });

        } catch (error) {
            next(error);
        }
    };

  // GET PROFILE BY USER ID (current logged-in user)
    getMyProfile = async (req, res, next) => {
        try {
            const userId = req.user.userId;

            const profile = await this.studentProfileService.getStudentProfileByUserId(userId);

        return res.status(200).json({
            success: true,
            message: profile.message,
            data: profile.data
        });

        } catch (error) {
            next(error);
        };
    };

  // UPDATE PROFILE
    updateProfile = async (req, res, next) => {
        try {
            const userId = req.user.userId;
            const updateData = req.body;

            const updatedProfile = await this.studentProfileService.updateStudentProfile(userId, updateData);

        return res.status(200).json({
            success: true,
            message: updatedProfile.message,
            data: updatedProfile.data
        });

        } catch (error) {
            next(error);
        }
    };
};