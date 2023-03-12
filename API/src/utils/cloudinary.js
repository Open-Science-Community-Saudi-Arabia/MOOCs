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
 * @param {*} file 
 * @param {*} destination_path
 * 
 * @example
 * const file = {
 * filename: 'image.jpg',
 * path: 'C:\\Users\\user\\AppData\\Local\\Temp\\image.jpg'
 * destination_path: 'my_folder'
 * }
 * 
 * @returns 
 */
async function uploadToCloudinary(file) {
    const { path } = file;
    if (!path || !file.destination_path || !file.file_name) throw new Error('Invalid file');

    const { secure_url } = await cloudinary.uploader.upload(path, {
        folder: file.destination_path,
        public_id: file.file_name,
        resource_type: "auto",
    });
    return secure_url;
}

module.exports = {
    uploadToCloudinary
}