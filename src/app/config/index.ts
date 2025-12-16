import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,

    jwt: {
        accessToken :process.env.JWT_ACCESS_SECRET,
        refreshToken:process.env.JWT_REFRESH_SECRET
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
    }
}