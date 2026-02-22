// src/services/resumeService.js
import axios from "axios";

const rawUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const BASE_URL = rawUrl.endsWith("/") ? rawUrl.slice(0, -1) : rawUrl;

// Helper — always grabs the latest token from storage
const authHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

// 1. Fetch all resumes for logged-in user
export const getResumes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/resumes/all`, {
      headers: authHeaders(),
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return [];
  }
};

// 2. Create a new resume
export const createResume = async (resumeData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/resumes/save`,
      resumeData,
      {
        headers: authHeaders(),
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating resume:", error.response?.status, error.response?.data);
    throw error;
  }
};

// 3. Update an existing resume
export const updateResume = async (resumeId, resumeData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/resumes/update/${resumeId}`,
      resumeData,
      {
        headers: authHeaders(),
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating resume:", error);
    throw error;
  }
};

// 4. Fetch a single resume by ID
export const getResumeById = async (resumeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/resumes/${resumeId}`, {
      headers: authHeaders(),
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching single resume:", error);
    throw error;
  }
};

// 5. Delete a resume
export const deleteResume = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/resumes/${id}`, {
      headers: authHeaders(),
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Delete Error:", error);
    throw error;
  }
};

// 6. AI Enhancement
export const enhanceText = async (text, type) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/ai/enhance`,
      { text, type },
      {
        headers: authHeaders(),
        withCredentials: true,
      }
    );
    return response.data.enhancedText;
  } catch (error) {
    console.error("AI Enhancement Error:", error);
    throw error;
  }
};