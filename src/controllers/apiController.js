// apiController.js
const externalApiService = require('../services/externalApiService');

module.exports = {
  async getUser(req, res) {
    try {
      const { id } = req.params;
      const user = await externalApiService.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user', error });
    }
  },

  async createUser(req, res) {
    try {
      const userData = req.body;
      const newUser = await externalApiService.createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error });
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const userData = req.body;
      const updatedUser = await externalApiService.updateUser(id, userData);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await externalApiService.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
    }
  },

  async isUserRegistered(req, res) {
    try {
      const { id } = req.params;
      const isRegistered = await externalApiService.checkUserRegistration(id);
      res.status(200).json({ registered: isRegistered });
    } catch (error) {
      res.status(500).json({ message: 'Error checking user registration', error });
    }
  },
};

