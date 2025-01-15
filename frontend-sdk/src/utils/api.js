import axios from "axios";
const API_BASE_URL = "http://localhost:5000/api/auth"
export const signup = async (userData)=>{
    try {
        const response = await axios.post(`${API_BASE_URL}/signup`,userData)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}
export const login = async (credentials)=>{
    try {
        const response = await axios.post(`${API_BASE_URL}/login`,credentials)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}
export const logout = async ()=>{
    try {
        const response = await axios.post(`${API_BASE_URL}/logout`)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}
export const getProfile = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  };
