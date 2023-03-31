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
 * @returns {Promise<void>}
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
 * @returns {Promise<void>}
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

exports.deleteDownloadableResource = async (req, res, next) => {
}

exports.updateDownloadableResource = async (req, res, next) => {
}

exports.uploadDownloadableResource = async (req, res, next) => {
}