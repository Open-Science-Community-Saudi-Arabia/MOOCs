const { DownloadableResource } = require('../models/course.models');
const { User } = require('../models/user.models');
const { uploadToCloudinary } = require('../utils/cloudinary');

const { BadRequestError, NotFoundError } = require('../utils/errors');

/**
 * Get all downloadable resources
 * 
 * @description This function is used to get all downloadable resources
 * 
 * @param {String} id - The course id
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * 
 * @returns {Object} - The downloadable resources
 */
exports.getDownloadableResources = async (req, res, next) => {
    const { courseId } = req.params;

    // Check if id is provided
    if (!courseId || courseId == null || courseId == undefined) {
        return next(new BadRequestError('Course id is required'));
    }

    const downloadable_resources = await DownloadableResource.find({ course: courseId });

    res.status(200).json({
        status: 'success',
        data: {
            downloadable_resources
        }
    })
}

/**
 * Get downloadable resource data
 * 
 * @description This function is used to get downloadable resource data
 * 
 * @param {String} id - The resource id
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * 
 * @returns {Object} - The resource data
 */
exports.getDownloadableResourceData = async (req, res, next) => {
    const { id } = req.params;

    // Check if id is provided
    if (!id || id == null || id == undefined) {
        return next(new BadRequestError('Resource id is required'));
    }

    const downloadable_resource = await DownloadableResource.findById(id);
    if (!downloadable_resource) {
        return next(new NotFoundError('Resource not found'));
    }

    res.status(200).json({
        status: 'success',
        data: {
            downloadable_resource
        }
    })
}

/**
 * Delete downloadable resource
 * 
 * @description This function is used to delete downloadable resource
 * 
 * @param {String} id - The resource id
 * 
 * @returns {Object} - The deleted resource
 */
exports.deleteDownloadableResource = async (req, res, next) => {
    const { id } = req.params;

    // Check if id is provided
    if (!id || id == null || id == undefined) {
        return next(new BadRequestError('Resource id is required'));
    }

    const downloadable_resource = await DownloadableResource.findById(id);
    if (!downloadable_resource) {
        return next(new NotFoundError('Resource not found'));
    }

    await downloadable_resource.remove();


    res.status(200).json({
        status: 'success',
        data: {
            downloadable_resource
        }
    })
}

/**
 * Update downloadable resource
 * 
 * @description This function is used to update downloadable resource
 * 
 * @param {String} id - The resource id
 * 
 * @returns {Object} - The updated resource
 */
exports.updateDownloadableResource = async (req, res, next) => {
    const { id } = req.params;

    if (!id || id == null || id == undefined) {
        return next(new BadRequestError('Resource id is required'));
    }

    const downloadable_resource = await DownloadableResource.findById(id);

    if (!downloadable_resource) {
        return next(new NotFoundError('Resource not found'));
    }

    const { title, description, file_url } = req.body;

    downloadable_resource.title = title;
    downloadable_resource.description = description;
    downloadable_resource.file_url = file_url;

    const updated_doc = await downloadable_resource.save();

    res.status(200).json({
        status: 'success',
        data: {
            updated_resource: updated_doc
        }
    })
}

/**
 * Upload downloadable resource
 * 
 * @description This function is used to upload downloadable resource.
 * The user can upload a file or a url to the file
 * 
 * @param {String} id - The course id
 * @param {String} title - The title of the resource
 * @param {String} description - The description of the resource
 * @param {String} file_url - The url to the file
 * 
 * @returns {Object} - The uploaded resource
 */
exports.uploadDownloadableResource = async (req, res, next) => {
    const { title, description, file_url, course_id, resource_type } = req.body;

    let downloadable_resource = new DownloadableResource({
        title,
        description,
        course: course_id,
        resource_type
    });

    // Check if file is uploaded or url is provided
    if (file_url) { // Url was provided
        downloadable_resource.file_url = file_url;
    } else if (req.file) { // File was uploaded instead
        // Upload file to cloudinary
        const file_url = await uploadToCloudinary({
            path: req.file.path,
            file_name: `${downloadable_resource._id}_${req.file.filename}`,
            destination_path: `courses/${id}/downloadable_resources`
        });

        downloadable_resource.file_url = file_url;
    } else { // No file was uploaded or url was provided
        return next(new BadRequestError('File is required'));
    }

    downloadable_resource = await downloadable_resource.save();

    res.status(200).json({
        status: 'success',
        data: {
            downloadable_resource
        }
    })
}

exports.createDownloadableResource = async (req, res, next) => {
    const { title, description, file_url, course_id, resource_type } = req.body;

    let downloadable_resource = new DownloadableResource({
        title,
        description,
        course: course_id,
        file_url,
        resource_type
    });

    downloadable_resource = await downloadable_resource.save();

    res.status(200).json({
        status: 'success',
        data: {
            downloadable_resource
        }
    })
}