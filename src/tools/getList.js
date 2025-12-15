import httpRequest from "./httpRequest";

async function getList(url) {
  const response = await httpRequest.get(url);
  return response.data;
}

export default getList;
