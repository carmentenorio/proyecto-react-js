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
        return data;
    } catch (error) {
        console.error("Error en getAll():", error);
    }
};

const getOne = async (id) => {
    const response = await fetch(`${API_URL}/categories/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${TOKEN}`,
        },
    });
    if (!response.ok) throw new Error("error al obtenr la categoria");
    const data = await response.json();
    console.log("Respuesta API:", data);
    return data;
};

export default {
    getAll, getOne
};