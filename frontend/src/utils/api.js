const BASE_URL = import.meta.env.VITE_API_URL;

export const apiRequest = async (endpoint, options = {}) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!res.ok) {
      throw new Error("API Error");
    }

    return await res.json();
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
};