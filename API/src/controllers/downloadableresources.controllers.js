const { DownloadableResource, TextMaterial, Video, Course } = require('../models/course.models');
const { uploadToCloudinary } = require('../utils/cloudinary');
const fs = require('fs');
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
    const { textmaterial_id, video_id, course_id } = req.query;

    let downloadable_resources;

    // Check if textmaterial_id is provided
    if (textmaterial_id && textmaterial_id != null && textmaterial_id != undefined) {
        const text_material = await TextMaterial.findById(textmaterial_id);
        if (!text_material) { return next(new NotFoundError('Text material not found')); }
        downloadable_resources = await DownloadableResource.find({ textmaterial: textmaterial_id });
    }

    if (course_id && course_id != null && course_id != undefined) {
        const course = await Course.findById(course_id);
        if (!course) { return next(new NotFoundError('Course not found')); }
        downloadable_resources = await DownloadableResource.find({ video: video_id });
    }

    if (video_id && video_id != null && video_id != undefined) {
        const video = await Video.findById(video_id);
        if (!video) { return next(new NotFoundError('Video not found')); }
        downloadable_resources = await DownloadableResource.find({ video: video_id });
    }

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
 * @description This function is used to update downloadable resource.
 * The user can update the title, description and file url
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

    const downloadable_resource = await DownloadableResource.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true });

    if (!downloadable_resource) {
        return next(new NotFoundError('Resource not found'));
    }

    res.status(200).json({
        status: 'success',
        data: {
            updated_resource: downloadable_resource
        }
    })
}

/**
 * Upload downloadable resource
 * 
 * @description This function is used to upload downloadable resource.
 * This is used when the user wants to upload a file to the server
 * 
 * @param {String} id - The course id
 * @param {String} title - The title of the resource
 * @param {String} description - The description of the resource
 * @param {String} file - The file to be uploaded
 * 
 * @returns {Object} - The uploaded resource
 */
exports.uploadDownloadableResource = async (req, res, next) => {
    const { title, description, course_id, resource_type, video_id, text_material_id } = req.body;
    console.log(req.body)
    let video, textmaterial;
    if (video_id) {
        video = await Video.findById(video_id);
        if (!video) {
            return next(new NotFoundError('Video not found'));
        }
    } else if (text_material_id) {
        textmaterial = await TextMaterial.findById(text_material_id);
        if (!textmaterial) {
            return next(new NotFoundError('Text material not found'));
        }
    } else if (!course_id) { return next(new BadRequestError('Missing required params in request body')); }

    console.log(textmaterial, video)

    let downloadable_resource = new DownloadableResource({
        title,
        description,
        course: course_id || textmaterial?.course || video?.course,
        textmaterial: textmaterial?._id,
        video: video?._id,
        resource_type
    });

    const file_url = await uploadToCloudinary({
        path: req.file.path,
        file_name: `${downloadable_resource._id}_${req.file.filename}`,
        destination_path: `courses/${course_id}/downloadable_resources`
    });

    // Delete the file from the server
    await fs.unlinkSync(req.file.path, (err) => {
        if (err) {
            console.log(err);
        }
    });

    downloadable_resource.file_url = file_url;
    downloadable_resource = await downloadable_resource.save();

    res.status(200).json({
        status: 'success',
        data: {
            downloadable_resource
        }
    })
}

/**
 * Create downloadable resource
 * 
 * @description This function is used to create downloadable resource.
 * This is used when the user wants to create a resource with a url to the file
 * 
 * @param {String} course_id - The course id
 * @param {String} title - The title of the resource
 * @param {String} description - The description of the resource
 * @param {String} file_url - The url to the file
 *  
 * @returns {Object} - The created resource
 */
exports.createDownloadableResource = async (req, res, next) => {
    const { title, description, file_url, course_id, video_id, text_material_id, resource_type } = req.body;

    let video, textmaterial;
    if (video_id) {
        video = await Video.findById(video_id);
        if (!video) {
            return next(new NotFoundError('Video not found'));
        }
    } else if (text_material_id) {
        textmaterial = await TextMaterial.findById(text_material_id);
        if (!textmaterial) {
            return next(new NotFoundError('Text material not found'));
        }
    } else if (!course_id) { return next(new BadRequestError('Missing required params in request body')); }

    console.log(textmaterial, video)

    let downloadable_resource = new DownloadableResource({
        title,
        description,
        course: course_id || textmaterial?.course || video?.course,
        textmaterial: textmaterial?._id,
        video: video?._id,
        resource_type,
        file_url
    });

    downloadable_resource = await downloadable_resource.save();

    res.status(200).json({
        status: 'success',
        data: {
            downloadable_resource
        }
    })
}