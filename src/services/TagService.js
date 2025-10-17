import apiFetch from './apiFetch.js';
const TAG_ROUTE = 'tags';
const getAll = async () => {
  const data = await apiFetch(`${TAG_ROUTE}`);
  return data;
};

const getOne = async (id) => {
  const data = await apiFetch(`${TAG_ROUTE}/${id}`);
  return data;
};

const create = async (tagCreate) => {
  const response = await apiFetch(`${TAG_ROUTE}`,
    { method: 'POST', body: tagCreate }
  );
  return response;
}
const update = async (id, tagUpdate) => {
  const response = await apiFetch(`${TAG_ROUTE}/${id}`,
    { method: 'PUT', body: tagUpdate }
  );
  return response;

};

const remove = async (id) => {
  const response = await apiFetch(`${TAG_ROUTE}/${id}`,
    { method: 'DELETE' }
  );
  return response;
};
export default {
  getAll, getOne, create, update, remove
};
