import makeApiCall from ".";
import { useQuery } from "react-query";

/**
 * @category Frontend
 * @subcategory Endpoint
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
export async function getCourse(id: string) {
  const response = await makeApiCall(`/course/${id}`);
  return response;
}

/**
 * @description Enroll user to a course
 * @param  {string} id  user id
 * @return {Promise<object>} response data
 */
export async function enrollUser(id: string) {
  const response = await makeApiCall(`course/enroll/${id}`, "post");
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
export async function exerciseScore(id: string, payload: any) {
  const response = await makeApiCall(`exercise/score/${id}`, "post", payload);
  return response;
}

/**
 * @description handle signup api call and update current token
 * @param  {string} id  course id
 * @return {Promise<object>} response data
 */
export async function getCertificate(id: string) {
  const response = await makeApiCall(`certificate/course/${id}`);
  return response;
}

// Get a course
export function useCourse(id: any) {
  const query = useQuery(["course"], () => getCourse(id));
  return query;
}
