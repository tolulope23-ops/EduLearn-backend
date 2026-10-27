import { QuizService } from "../service/quiz.service.js";

export class QuizController {
    /**
     * @param {QuizService} quizService
     */

    constructor(quizService) {
        this.quizService = quizService;
    };

// Get all quiz questions with options
    getQuizBySubmodule = async (req, res, next) => {
        try {
            // const { submoduleId } = req.params;

            const quiz = await this.quizService.getQuizBySubmodule();
            res.status(200).json({ 
                success: true, 
                data: quiz 
            });
        } catch (err) {
            next(err);
        };
    };

// Get a single quiz question with options
    getQuizQuestionWithOptions = async (req, res, next) => {
        try {
            const { questionId } = req.params;
            const quiz = await this.quizService.getQuizQuestionWithOptions(questionId);
            res.status(200).json({ 
                success: true, 
                data: quiz 
            });
        } catch (err) {
            next(err);
        };
    };

// Fetch quiz for a submodule (doc or video)
    getQuizQuestionForSubmodule = async (req, res, next) => {
        try {
                const { submoduleId } = req.params;
                const quiz = await this.quizService.getQuizQuestionForSubmodule(submoduleId);

            res.status(200).json({ 
                success: true, 
                data: quiz 
            });
        } catch (err) {
            next(err);
        }
    };

// Submit quiz answers
    submitQuiz = async (req, res, next) => {
        try {
            const {submoduleId, answers } = req.body;

            const {userId} = req.user;
            
            const result = await this.quizService.submitQuiz(userId, submoduleId, answers);

            res.status(200).json({ 
                success: true, 
                data: result 
            });
        } catch (err) {
            next(err);
        }
    };


    retakeQuiz = async (req, res, next) => {
        try {
            const {userId} = req.user;
            const { submoduleId } = req.body;
            

            const result = await this.quizService.retakeQuiz(
                userId,
                submoduleId,
            );

            return res.status(200).json({
                success: true,
                message: result.message,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }
};