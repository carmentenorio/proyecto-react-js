import apiFetch from './apiFetch.js';
const CATEGORY_ROUTE = 'categories';

const getAll = async (usePagination = false, page = 1) => {
    const endpoint =  `${CATEGORY_ROUTE}?pages=${usePagination}&page=${page}`;
    const { data } = await apiFetch(endpoint);
    return data;
};

const getOne = async (id) => {
    const data = await apiFetch(`${CATEGORY_ROUTE}/${id}`);
    return data;
};

const create = async (categoryCreate) => {
    const response = await apiFetch(`${CATEGORY_ROUTE}`,
        { method: 'POST', body: categoryCreate }
    );
    return response;
}
const update = async (id, categoryUpdate) => {
    const response = await apiFetch(`${CATEGORY_ROUTE}/${id}`,
        { method: 'PUT', body: categoryUpdate }
    );
    return response;
};
const remove = async (id) => {
    const response = await apiFetch(`${CATEGORY_ROUTE}/${id}`,
        { method: 'DELETE' }
    );
    return response;
};
export default {
    getAll, getOne, create, update, remove
};