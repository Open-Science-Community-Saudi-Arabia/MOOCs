import makeApiCall from ".";
import { Courses } from "../../types";

/**
 * @category Client
 * @subcategory Utilities
 * @module Courses Endpoint
 * @description This module contains the axios request for handling course content,
 */

/**
 * @description Get all Available Courses
 * @return {Promise<object>} response data
 */
export async function getCourses() {
  const response = await makeApiCall("/course");
  return response;
}


/**
 * @description Create a Course by a contributor or super admin
 * @param  {object}  payload Request payload
 * @return {Promise<object>} Response data
 */
export async function createCourse(payload: Courses | any) {
  const response = await makeApiCall(`/course/new`, "post", payload);
  return response;
}

/**
 * @description Enroll user to a course
 * @param  {string} courseId  course Id
 * @return {Promise<object>} Response data
 */
export async function enrollUser(courseId: string) {
  const response = await makeApiCall(`/course/enroll/${courseId}`);
  return response;
}


/**
 * @description Check quiz exercise submission
 * @param  {object} payload  submission data
 * @param  {string} courseId  course ID
 * @return {Promise<object>} response data
 */
export async function exerciseScore(courseId:string, payload: any) {
  const response = await makeApiCall(`/course/exercise-score/${courseId}`, "post", payload);
  return response;
}

/**
 * @description handle signup api call and update current token
 * @param  {string} id  course id
 * @return {Promise<object>} response data
 */

export async function getCertificate(id: string | any) {
  const response = await makeApiCall(`certificate/course/${id}`);
  return response;
}

/**
 * @description Check quiz exercise submission
 * @param  {string} contributorId  Contributor ID
 * @return {Promise<object>} response data
 */
export async function getContributorCourses(contributorId: string) {
  const response = await makeApiCall(`/course/contributor/${contributorId}`);
  return response;
}

/**
 * @description Get all courses
 * @return {Promise<object>} response data
 */
export async function getAllCourses() {
  const response = await makeApiCall(`/course`, "get");
  return response;
}

/**
 * @description Check all user courses
 * @return {Promise<object>} response data
 */
export async function getUserCourses() {
  const response = await makeApiCall("/course/approved", "get");
  return response;
}

/**
 * @description Approved a course
 * @param  {string} courseId  Course Id
 * @return {Promise<object>} response data
 */
export async function approveACourse(courseId: string) {
  const response = await makeApiCall(`/course/approve/${courseId}`, "get");
  return response;
}

/**
 * @description Archived a course
 * @param  {string} courseId  Course Id
 * @return {Promise<object>} response data
 */
export async function toggleCourseArchive(courseId: string) {
  const response = await makeApiCall(`/course/archive/${courseId}`);
  return response;
}

/**
 * @description Update a course
 * @param  {string} courseId  Course Id
 * @param  {FormData} payload  Payload
 * @return {Promise<object>} response data
 */
export async function updateACourse(courseId: string, payload: FormData) {
  const response = await makeApiCall(`/course/${courseId}`, "patch", payload);
  return response;
}

/**
 * @description Update a course status to pending
 * @param  {string} courseId  Course Id
 * @return {Promise<object>} response data
 */
export async function makeCoursePending(courseId: string) {
  const response = await makeApiCall(`/course/pending/${courseId}`);
  return response;
}

/**
 * @description Toggle  a course availabiltiy
 * @param  {string} courseId  Course Id
 * @return {Promise<object>} response data
 */
export async function toggleAvailablity(courseId: string) {
  const response = await makeApiCall(`/course/toggle-available/${courseId}`);
  return response;
}

/**
 * @description Toggle  a course editing mode
 * @param  {string} courseId  Course Id
 * @return {Promise<object>} response data
 */
export async function toggleCourseEditing(courseId: string) {
  const response = await makeApiCall(`/course/toggle-editing/${courseId}`);
  return response;
}

/**
 * @description Get a user course
 * @param  {string} courseId  Course Id
 * @return {Promise<object>} response data
 */
export async function getUserCourse( courseId: string) {
  const response = await makeApiCall(`/user/course/${courseId}`);
  return response.data;
}

/**
 * @description Get overall user quiz sore for a course
 * @param  {string} courseId  Course Id
 * @return {Promise<object>} response data
 */
export async function getOverallUserQuiz(courseId: string) {
  const response = await makeApiCall(`/user/overall-score/${courseId}`);
  return response;
}