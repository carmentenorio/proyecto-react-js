import apiFetch from './apiFetch.js';
const TASK_ROUTE = 'tasks';
const getAll = async () => {
  const data = await apiFetch(`${TASK_ROUTE}`);
  console.log('esto lelgfa del backend', data);
  
  return data;
};

const getOne = async (id) => {
  const data = await apiFetch(`${TASK_ROUTE}/${id}`);
  return data;
};

const create = async (taskCreate) => {
  const response = await apiFetch(`${TASK_ROUTE}`,
    { method: 'POST', body: taskCreate }
  );
  return response;
}
const update = async (id, taskUpdate) => {
  const response = await apiFetch(`${TASK_ROUTE}/${id}`,
    { method: 'PUT', body: taskUpdate }
  );
  return response;

};

const remove = async (id) => {
  const response = await apiFetch(`${TASK_ROUTE}/${id}`,
    { method: 'DELETE' }
  );
  return response;
};
export default {
  getAll, getOne, create, update, remove
};
