// externalApiService.js
require('dotenv').config();
const axios = require('axios');

const BASE_URL = process.env.BASE_URL_API_USER;

module.exports = {
  async getUserById(id) {
    const response = await axios.get(`${BASE_URL}/users/${id}`);
    return response.data;
  },

  async createUser(userData) {
    const response = await axios.post(`${BASE_URL}/users`, userData);
    return response.data;
  },

  async updateUser(id, userData) {
    const response = await axios.put(`${BASE_URL}/users/${id}`, userData);
    return response.data;
  },

  async deleteUser(id) {
    await axios.delete(`${BASE_URL}/users/${id}`);
  },

  async checkUserRegistration(id) {
    const response = await axios.get(`${BASE_URL}/users/${id}/exists`);
    return response.data;
  },
};

