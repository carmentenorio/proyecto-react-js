import Login from "../components/auth/Login";

const BASE_URL = import.meta.env.VITE_BE_BASE_URL;
console.log("BASE_URL",BASE_URL);
async function apiFetch(endpoint, { method = 'GET', body, headers = {} } = {}) {
    const token = localStorage.getItem('token');

    const config = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...headers,
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
    };
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, config);
        if (response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
            return null;
        }
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Error en la solicitud');
        }
        if (response.status === 204) return null;
        return await response.json();
    } catch (error) {
        console.error('Error en apiFetch:', error);
        throw error;
    }
}
export default apiFetch;