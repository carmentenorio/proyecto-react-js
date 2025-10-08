const API_URL = "https:///api"; 

export const getAll = async (token) => {
  try {
    const response = await fetch(`${API_URL}/task`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: no se pudieron obtener las tareas`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en getAll():", error);
    throw error;
  }
};

console.log(getAll());