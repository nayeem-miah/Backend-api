import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,

    jwt: {
        accessToken: process.env.JWT_ACCESS_SECRET,
        refreshToken: process.env.JWT_REFRESH_SECRET
    },

    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    },

    nodeMiller: {
        email_host: process.env.EMAIL_HOST,
        email_port: process.env.EMAIL_PORT,
        email_user: process.env.EMAIL_USER,
        email_pass: process.env.EMAIL_PASS,
        email_from: process.env.EMAIL_FROM,
    },

    stripe: {
        stripeSecretKey: process.env.STRIPE_SECRET_KEY,
        stripeWebHookSecret: process.env.STRIPE_WEBHOOKS_SECRET,
        frontendUrl: process.env.FRONTEND_URL
    },

    ssl: {
        SSL_STORE_ID: process.env.SSL_STORE_ID,
        SSL_STORE_PASS: process.env.SSL_STORE_PASS,
        SSL_PAYMENT_API: process.env.SSL_PAYMENT_API,
        SSL_VALIDATION_API: process.env.SSL_VALIDATION_API,
        SSL_SUCCESS_BACKEND_URL: process.env.SSL_SUCCESS_BACKEND_URL,
        SSL_FAIL_BACKEND_URL: process.env.SSL_FAIL_BACKEND_URL,
        SSL_CANCEL_BACKEND_URL: process.env.SSL_CANCEL_BACKEND_URL,
        SSL_SUCCESS_FRONTEND_URL: process.env.SSL_SUCCESS_FRONTEND_URL,
        SSL_FAIL_FRONTEND_URL: process.env.SSL_FAIL_FRONTEND_URL,
        SSL_CANCEL_FRONTEND_URL: process.env.SSL_CANCEL_FRONTEND_URL,
        SSL_IPN_URL: process.env.SSL_IPN_URL,
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
    },
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
    },

    // Google OAuth (NEW)
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/v1/users/auth/google/callback',
    },

    // Session Secret (NEW)
    session: {
        secret: process.env.SESSION_SECRET || 'fallback-secret-change-this-in-production',
    },
}
