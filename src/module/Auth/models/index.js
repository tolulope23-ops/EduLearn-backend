// Import all models and export for easy accesibility when importing from other file.
import User from './user.model.js'
import AuthCredential from './authCredential.model.js';
import RefreshToken from './refreshToken.model.js';
import AuthSession from './authSession.model.js';
import StudentProfile from './studentProfile.model.js';

// Import associations
import './associations.js';

export {
  User,
  StudentProfile,
  AuthCredential,
  RefreshToken,
  AuthSession,
};
