import makeApiCall from ".";
import { Courses } from "../../types";

/**
 * @category Client App
 * @subcategory Utilities
 * @module Courses
 * @description This module contains the controllers for handling course content,
 */

/**
 * @description Get all Available  Courses
 * @return {Promise<object>} response data
 */
export async function getCourses() {
  const response = await makeApiCall("/course");
  return response;
}

/**
 * @description Get Individual Course
 * @param  {string} id  course id
 * @return {Promise<object>} response data
 */
export async function getCourse(courseId: string | any) {
  const response = await makeApiCall(`/course/${courseId}`);
  return response.data;
}

/**
 * @description create Individual Course
 * @param  {string} id  course id
 * @return {Promise<object>} response data
 */
export async function createCourse(payload: Courses | any) {
  const response = await makeApiCall(`/course/new`, "post", payload);
  return response;
}

/**
 * @description Enroll user to a course
 * @param  {string} id  user id
 * @return {Promise<object>} response data
 */
export async function enrollUser(courseId: string) {
  const response = await makeApiCall(`/course/enroll/${courseId}`);
  return response;
}

/**
 * @description Update the exercise data
 * @param  {string} id  exercise ID
 * @param  {object} payload  request data
 * @return {Promise<object>} response data
 */
export async function updateExercise(id: string, payload: any) {
  const response = await makeApiCall(
    `/exercise/update/${id}`,
    "patch",
    payload
  );
  return response;
}

/**
 * @description Post quiz exercise submission
 * @param  {object} payload  submission data
 * @param  {string} id  course ID
 * @return {Promise<object>} response data
 */
export async function exerciseScore(courseId:string, userId: string, payload: any) {
  const response = await makeApiCall(`/course/exercise-score/${userId}/${courseId}`, "post", payload);
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

export async function getContributorCourses(contributorId: string) {
  const response = await makeApiCall(`/course/contributor/${contributorId}`);
  return response;
}

export async function getAllCourses() {
  const response = await makeApiCall(`/course`, "get");
  return response;
}

export async function getUserCourses() {
  const response = await makeApiCall("/course/approved", "get");
  return response;
}

export async function approveACourse(courseId: string) {
  const response = await makeApiCall(`/course/approve/${courseId}`, "get");
  return response;
}

export async function archiveACourse(courseId: string) {
  const response = await makeApiCall(`/course/archive/${courseId}`);
  return response;
}

export async function updateACourse(courseId: string, payload: FormData) {
  const response = await makeApiCall(`/course/${courseId}`, "patch", payload);
  return response;
}

export async function makeCoursePending(courseId: string) {
  const response = await makeApiCall(`/course/pending/${courseId}`);
  return response;
}

export async function toggleAvailablity(courseId: string) {
  const response = await makeApiCall(`/course/toggle-available/${courseId}`);
  return response;
}

export async function toggleCourseEditing(courseId: string) {
  const response = await makeApiCall(`/course/toggle-editing/${courseId}`);
  return response;
}
