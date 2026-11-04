// ============================================================
//  rateLimiter.js — Production Rate Limiting Middleware
//  Powered by express-rate-limit
// ============================================================
const { rateLimit } = require('express-rate-limit');

// ─── 1. General API Limiter (applies to all general API endpoints) ───
// 100 requests per 15 minutes per IP
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per window
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        status: 429,
        message: 'Too many requests from this IP, please try again after 15 minutes.'
    },
    skip: (req) => {
        // Skip health checks, root ping, and static uploads
        return req.path === '/' || req.path.startsWith('/uploads');
    }
});

// ─── 2. Auth Limiter (Brute-force protection for login & register) ───
// 10 attempts per 15 minutes per IP
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 4, // Limit each IP to 10 login/register requests per window
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        status: 429,
        message: 'Too many authentication attempts from this IP. Please try again after 15 minutes.'
    }
});

// ─── 3. Booking Limiter (Table reservation spam protection) ───
// 10 table booking submissions per hour per IP
const bookingLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    limit: 4, // Limit each IP to 10 table bookings per hour
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        status: 429,
        message: 'Too many table reservations submitted from this IP. Please wait an hour or contact us directly.'
    }
});

module.exports = {
    apiLimiter,
    authLimiter,
    bookingLimiter
};

