// src/controllers/userController.js

const UserService = require('../services/userService');
const { validateUser , validateUser Update } = require('../utils/validators');

class UserController {
    async createUser (req, res) {
        try {
            const { error } = validateUser (req.body);
            if (error) return res.status(400).json({ message: error.details[0].message });

            const user = await UserService.createUser (req.body);
            return res.status(201).json(user);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getUser (req, res) {
        try {
            const user = await UserService.getUser ById(req.params.id);
            if (!user) return res.status(404).json({ message: 'User  not found' });
            return res.status(200).json(user);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async updateUser (req, res) {
        try {
            const { error } = validateUser Update(req.body);
            if (error) return res.status(400).json({ message: error.details[0].message });

            const updatedUser  = await UserService.updateUser (req.params.id, req.body);
            if (!updatedUser ) return res.status(404).json({ message: 'User  not found' });
            return res.status(200).json(updatedUser );
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async deleteUser (req, res) {
        try {
            const deletedUser  = await UserService.deleteUser (req.params.id);
            if (!deletedUser ) return res.status(404).json({ message: 'User  not found' });
            return res.status(204).send();
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new UserController();
