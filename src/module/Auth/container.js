import { UserRepository } from "./repository/user.repository.js";
import { UserAuthRepository } from "./repository/authCredential.repository.js";

import { UserAuthService } from "./service/auth.service.js";
import { PasswordHasher } from "./utils/passwordHashing.utils.js";
import { UserSessionService } from "./service/session.service.js";
import { UserSessionRepository } from "./repository/authSession.repository.js";
import { UserRefreshTokenService } from "./service/refreshToken.service.js";

import { UserRefreshTokenRepository } from "./repository/refreshToken.repository.js";
import { UserAuthMiddleware } from "../../common/middleware/auth.middleware.js";
import { UserAuthController } from "./controller/auth.controller.js";
import { StudentProfileService } from "./service/studentProfile.service.js";
import { StudentProfileRepository } from "./repository/studentProfile.repository.js";
import { StudentProfileController } from "./controller/studentProfile.controller.js";
import { ClassLevelRepository } from "../academic/repository/classLevel.repository.js";

// Repositories
const userRepoInstance = new UserRepository();
const userAuthRepoInstance = new UserAuthRepository();
const passwordHash = new PasswordHasher();

const sessionRepoInstance = new UserSessionRepository();
const refreshTokenRepoInstance = new UserRefreshTokenRepository();
const studentProfileRepoInstance = new StudentProfileRepository();
const classLevelRepoInstance = new ClassLevelRepository();


// Services
export const sessionService = new UserSessionService(sessionRepoInstance);
export const refreshTokenService = new UserRefreshTokenService(
  refreshTokenRepoInstance,
  sessionRepoInstance,
  sessionService
);

export const studentServiceInstance = new StudentProfileService(studentProfileRepoInstance, classLevelRepoInstance);

export const authService = new UserAuthService(
  userRepoInstance,
  userAuthRepoInstance,
  passwordHash,
  sessionService,
  refreshTokenService,
  studentServiceInstance
);

export const authMiddleware = new UserAuthMiddleware(sessionRepoInstance);

export const authController = new UserAuthController(authService, refreshTokenService);
export const studentProfileController = new StudentProfileController(studentServiceInstance);