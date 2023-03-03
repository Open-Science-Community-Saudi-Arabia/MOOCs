import makeApiCall from ".";

export async function courses() {
  const response = await makeApiCall("/course", "get");
  console.log(response);
  return response;
}
