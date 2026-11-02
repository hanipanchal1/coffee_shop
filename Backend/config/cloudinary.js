const cloudinary = require('cloudinary').v2

// ─────────────────────────────────────────────────────────────
//  Cloudinary Configuration
//  Reads credentials from .env — works on local & Render.
// ─────────────────────────────────────────────────────────────

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true // always use HTTPS URLs
})

module.exports = cloudinary

