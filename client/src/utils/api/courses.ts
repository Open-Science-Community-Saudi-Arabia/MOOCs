import makeApiCall from ".";

export async function getCourses() {
  const response = await makeApiCall("/course", "get");
  return response;
}
