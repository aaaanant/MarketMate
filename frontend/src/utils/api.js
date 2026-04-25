const BASE_URL = import.meta.env.VITE_API_URL;

export const apiRequest = async (endpoint, options = {}) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "API Error");
    }

    return data;
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
};