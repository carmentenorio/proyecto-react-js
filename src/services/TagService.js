const API_URL = "http://localhost:8000/api";
const TOKEN = "7|yakMVA4sHL7YiqicAfkSXeYZbcfod3MpGDuNPDQf0ac706e3";

const getAll = async () => {
  try {
    const response = await fetch(`${API_URL}/tags`, {
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

    return { ok: false, status: 500, data: null };
  }
};

const getOne = async (id) => {
  const response = await fetch(`${API_URL}/tags/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${TOKEN}`,
    },
  });
  if (!response.ok) throw new Error("error getting tag");
  const data = await response.json();
  return data;
};

const create = async (payload) => {
  const response = await fetch(`${API_URL}/tags`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(payload),
  });
  return response;
}
const update = async (id, tagUpdate) => {
  const response = await fetch(`${API_URL}/tags/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(tagUpdate),
  });
  if (!response) {
    throw new Error("No response was received from the server.");
  }
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Error updating tag");
  }
  return await response.json();

};

const remove = async (id) => {
  const response = await fetch(`${API_URL}/tags/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${TOKEN}`,
    },
  });
  if (!response) throw new Error("No response was received from the server");
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Error remove tag");
  }
  const json = await response.json();
  return json;
};
export default {
  getAll, getOne, create, update, remove
};
