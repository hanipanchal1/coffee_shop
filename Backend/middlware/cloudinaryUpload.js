const cloudinary = require('../config/cloudinary')
const multer = require('multer')

// Use memory storage — files never touch disk, stream straight to Cloudinary
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max per file
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true)
        } else {
            cb(new Error('Only image files are allowed'), false)
        }
    }
})

/**
 * Upload a file buffer to Cloudinary.
 * @param {Buffer} buffer  - The file buffer from multer memoryStorage
 * @param {string} folder  - Cloudinary folder path (e.g. 'coffee-shop/menu')
 * @returns {Promise<string>} Resolves with the secure HTTPS URL
 */
const uploadToCloudinary = (buffer, folder = 'coffee-shop') => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: 'image',
                transformation: [{ quality: 'auto', fetch_format: 'auto' }]
            },
            (err, result) => {
                if (err) return reject(err)
                resolve(result.secure_url)
            }
        )
        stream.end(buffer)
    })
}

/**
 * Delete an image from Cloudinary using its stored URL.
 * Safely extracts the public_id from the full Cloudinary URL.
 * @param {string} imageUrl - The full Cloudinary URL stored in MongoDB
 */
const deleteFromCloudinary = async (imageUrl) => {
    if (!imageUrl || !imageUrl.includes('cloudinary')) return
    try {
        // URL format: https://res.cloudinary.com/<cloud>/image/upload/v<version>/<folder>/<filename>.<ext>
        // public_id = everything after /upload/v<version>/ minus the extension
        const uploadIndex = imageUrl.indexOf('/upload/')
        if (uploadIndex === -1) return
        const afterUpload = imageUrl.substring(uploadIndex + 8) // strip '/upload/'
        // Strip version segment (v1234567890/) if present
        const withoutVersion = afterUpload.replace(/^v\d+\//, '')
        // Strip file extension
        const publicId = withoutVersion.replace(/\.[^/.]+$/, '')
        await cloudinary.uploader.destroy(publicId)
    } catch (err) {
        console.warn('Could not delete image from Cloudinary:', err.message)
    }
}

module.exports = { upload, uploadToCloudinary, deleteFromCloudinary }

