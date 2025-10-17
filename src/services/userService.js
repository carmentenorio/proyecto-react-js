import apiFetch from './apiFetch';
const login = async (params) => {
    const data = await apiFetch('login', { method: 'POST', body: params });
    return data;
}
const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
}
export default {
    login, logout
};
