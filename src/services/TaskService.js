const API_URL = "http://localhost:8000/api";
const TOKEN = "7|yakMVA4sHL7YiqicAfkSXeYZbcfod3MpGDuNPDQf0ac706e3";

const getAll = async () => {
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${TOKEN}`
            },
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en getAll():", error);
    }
};

const getOne = async (id) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${TOKEN}`,
            },
        });
        const data = await response.json();

        return data?.data || data;
    } catch (error) {
        console.error("Error en getOne:", error);
        throw error;
    }
};

const create = async (taskData) => {
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`
            },
            body: JSON.stringify(taskData),
        });
        return await response.json();
    } catch (error) {
        console.log("Error in create", error);
    }
}
const update = async (id, taskData) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`
            },
            body: JSON.stringify(taskData),
        });
        return await response.json();
    } catch (error) {
        console.log("Error in update", error);
        throw Error;
    }
}
const remove = async (id) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${TOKEN}`,
        },
    });
    if (!response) throw new Error("No response was received from the server");
    const json = await response.json();
    return json;
};

export default {
    getAll, create, update, getOne, remove
};