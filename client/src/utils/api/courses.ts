import makeApiCall from ".";
import { useQuery } from "react-query";

export async function getCourses() {
  const response = await makeApiCall("/course");
  return response;
}

export async function getCourse(id: string) {
  const response = await makeApiCall(`/course/${id}`);
  return response;
}

// https://moocs-test.onrender.com/api/v1/course/enroll/:id
export async function enrollUser(id: string) {
  const response = await makeApiCall(`course/enroll/${id}`, "post");
  return response;
}

// https://moocs-test.onrender.com/api/v1/exercise/update/:id
export async function updateExercise(id: string, payload: any) {
  const response = await makeApiCall(
    `/exercise/update/${id}`,
    "patch",
    payload
  );
  return response;
}

// https://moocs-test.onrender.com/api/v1/exercise/score/:id
export async function exerciseScore(id: string, payload: any) {
  const response = await makeApiCall(`exercise/score/${id}`, "post", payload);
  return response;
}

// https://moocs-test.onrender.com/api/v1/certificate/course/:id
export async function getCertificate(id: string) {
  const response = await makeApiCall(`certificate/course/${id}`);
  return response;
}

// React query
// get all courses
// export function useCourses() {
//   const query = useQuery(["course"], () => getCourses());
//   return query;
// }

// Get a course
export function useCourse(id: any) {
  const query = useQuery(["course"], () => getCourse(id));
  return query;
}
