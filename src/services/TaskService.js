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

const create = async (taskData) => {
    try {
        const response = await fetch(API_URL, {
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
export default {
    getAll, create
};