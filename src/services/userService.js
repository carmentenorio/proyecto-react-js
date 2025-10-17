import apiFetch from './apiFetch';
const login = async (params) => {
    const data = await apiFetch('login', { method: 'POST', body: params });
    let accessToken = null;
    if (data && data.access_token) {
        accessToken = data.access_token;
        localStorage.setItem('token', accessToken);
    }
    return data;
}
const logout = async ()=>{
    await apiFetch('logout',{ method: 'POST'});
    localStorage.removeItem('token');
}
export default {
    login, logout
};


