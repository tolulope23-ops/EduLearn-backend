import 'dotenv/config';  //importing .env

export const PORT = process.env.PORT || 4000;


//Email Configuration
export const RESEND_API_KEY = process.env.RESEND_API_KEY;
export const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL


//Local Development
export const FRONTEND_URL = process.env.FRONTEND_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const AI_BASE_URL = process.env.AI_BASE_URL;


export const allowedOrigins = process.env.ALLOWED_ORIGINS
?.split(",")
  .map(origin => origin.trim()) || [];