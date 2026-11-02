import axios from "axios";

// ─────────────────────────────────────────────────────────────
//  API Configuration
//  Reads the base URL from Vite environment variables (.env).
//  If VITE_API_URL is changed in .env or on Render, all API calls
//  and image upload URLs across the frontend update automatically.
// ─────────────────────────────────────────────────────────────

export const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:1000"
).replace(/\/+$/, "");

/**
 * Build the full public URL for an uploaded file/image.
 * Handles both relative filenames ('img_123.jpg') and full external URLs.
 */
export const getUploadUrl = (imageName) => {
  if (!imageName) return "";
  if (imageName.startsWith("http://") || imageName.startsWith("https://")) {
    return imageName;
  }
  return `${API_BASE_URL}/uploads/${imageName}`;
};

/**
 * Pre-configured Axios instance with baseURL and withCredentials.
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default api;

