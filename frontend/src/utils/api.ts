// @ts-nocheck
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

export const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("sro_admin_token");
  }
  return null;
};

export const setAuthToken = (token) => {
  if (typeof window !== "undefined") {
    if (token) {
      localStorage.setItem("sro_admin_token", token);
    } else {
      localStorage.removeItem("sro_admin_token");
    }
  }
};

const getHeaders = (isMultipart = false) => {
  const headers = {};
  if (!isMultipart) {
    headers["Content-Type"] = "application/json";
  }
  const token = getAuthToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getHeaders(options.body instanceof FormData),
      ...options.headers,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
};

export const apiGet = (endpoint) => apiRequest(endpoint, { method: "GET" });

export const apiPost = (endpoint, body, isMultipart = false) =>
  apiRequest(endpoint, {
    method: "POST",
    body: isMultipart ? body : JSON.stringify(body),
  });

export const apiPut = (endpoint, body, isMultipart = false) =>
  apiRequest(endpoint, {
    method: "PUT",
    body: isMultipart ? body : JSON.stringify(body),
  });

export const apiDelete = (endpoint) =>
  apiRequest(endpoint, { method: "DELETE" });
