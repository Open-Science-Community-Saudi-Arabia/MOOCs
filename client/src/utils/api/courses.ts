import makeApiCall from ".";
import { useQuery } from 'react-query'

export async function getCourses() {
  const response = await makeApiCall("/course");
  return response;
}
export async function getCourse(id:string) {
  const response = await makeApiCall(`/course/${id}`);
  return response;
}
// get all courses
export function useCourses() {
  const query = useQuery(['course'], () =>  getCourses())
  return query
}
// Get a course
export function useCourse(id:any) {
  const query = useQuery(['course'], () =>  getCourse(id))
  return query
}

