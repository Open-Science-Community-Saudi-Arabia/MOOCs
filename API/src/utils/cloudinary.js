/**
 * @category Backend API
 * @subcategory Utilities
 * @module Cloudinary Utility
 * 
 * @description Utilities for handling file uploads to cloudinary
 */

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
 * @param {object} file 
 * @param {string} file.path
 * @param {string} file.file_name
 * @param {string} file.destination_path
 * 
* @returns file url
 * 
 * @throws {Error} if invalid file 
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