const API_URL = "http://localhost:8000/api";
const TOKEN = "7|yakMVA4sHL7YiqicAfkSXeYZbcfod3MpGDuNPDQf0ac706e3";

const getAll = async () => {
    try {
        const response = await fetch(`${API_URL}/categories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${TOKEN}`
            },
        });
        const data = await response.json();
        return { ok: response.ok, status: response.status, data };
    } catch (error) {
        console.error("Error en getAll():", error);
        return { ok: false, status: 500, data: null };
    }
};

const getOne = async (id) => {
    const response = await fetch(`${API_URL}/categories/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${TOKEN}`,
        },
    });
    if (!response.ok) throw new Error("error getting category");
    const data = await response.json(); return data;
};

const create = async (categoryCreate) => {
    const response = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(categoryCreate),
    });
    return response;
}
const update = async (id, categoryUpdate) => {
    const response = await fetch(`${API_URL}/categories/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(categoryUpdate),
    });
    return await response.json();
};
const remove = async (id) => {
    try {
        const response = await fetch(`${API_URL}/categories/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`,
            },
        });
        let data = null;
        if (response.status !== 204) {
            try {
                data = await response.json();
            } catch {
                data = null;
            }
        }
        return { ok: response.ok, status: response.status, data };
    } catch (error) {
        return { ok: false, status: 500, data: null };
    }
};
export default {
    getAll, getOne, create, update, remove
};