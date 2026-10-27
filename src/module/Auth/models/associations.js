import User from './user.model.js';
import StudentProfile from './studentProfile.model.js';
import AuthCredential from './authCredential.model.js';
import RefreshToken from './refreshToken.model.js';
import AuthSession from './authSession.model.js';

// User ↔ AuthCredential
User.hasMany(AuthCredential, { foreignKey: 'userId' });
AuthCredential.belongsTo(User, { foreignKey: 'userId' });

// User ↔ AuthSession
User.hasMany(AuthSession, { foreignKey: 'userId' });
AuthSession.belongsTo(User, { foreignKey: 'userId' });

// User ↔ StudentProfile
User.hasOne(StudentProfile, { foreignKey: 'userId', as: 'students' });
StudentProfile.belongsTo(User, { foreignKey: 'userId' });

// RefreshToken ↔ AuthSession
RefreshToken.belongsTo(AuthSession, {foreignKey: 'sessionId',as: 'session'});
AuthSession.hasMany(RefreshToken, {foreignKey: 'sessionId', as: 'refreshTokens'});