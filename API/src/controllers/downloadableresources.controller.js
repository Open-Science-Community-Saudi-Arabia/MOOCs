const { DownloadableResources, User } = require('../models/downloadableresources.model');
const { User } = require('../models/user.model');

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
    const { id } = req.params;

    // Check if id is provided
    if (!id || id == null || id == undefined) {
        return next(new BadRequestError('Course id is required'));
    }

    const downloadable_resources = await DownloadableResources.find({ course: id });

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

    const downloadable_resource = await DownloadableResources.findById(id);
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

    const downloadable_resource = await DownloadableResources.findById(id);
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

    const downloadable_resource = await DownloadableResources.findById(id);

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

exports.uploadDownloadableResource = async (req, res, next) => {
}