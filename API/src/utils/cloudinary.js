const cloudinary = require('cloudinary').v2
const config = require('./config')

cloudinary.config({
    cloud_name: config.CLOUDINARY_CLOUD_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET,
})

/**
 * Uploads a file to cloudinary
 * 
 * @param {string} file 
 * @param {string} destination_path
 * @param {string} file_name
 * 
 * @returns file url
 * 
 * @throws {Error} if invalid file 
 * 
 */
async function uploadToCloudinary(file) {
    const { path, file_name, destination_path } = file;
    if (!path || !destination_path || !file_name) throw new Error('Invalid file');

    const { secure_url } = await cloudinary.uploader.upload(path, {
        folder: destination_path,
        public_id: file_name,
        resource_type: "auto",
    });
    return secure_url;
}

module.exports = {
    uploadToCloudinary
}