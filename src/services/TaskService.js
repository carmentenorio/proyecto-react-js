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

export default {
    getAll
};