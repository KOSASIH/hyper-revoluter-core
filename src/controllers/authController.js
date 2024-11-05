// src/controllers/authController.js

const AuthService = require('../services/authService');
const { validateLogin } = require('../utils/validators');

class AuthController {
    async login(req, res) {
        try {
            const { error } = validateLogin(req.body);
            if (error) return res.status(400).json({ message: error.details[0].message });

            const token = await AuthService.login(req.body.email, req.body.password);
            if (!token) return res.status(401).json({ message: 'Invalid email or password' });

            return res.status(200).json({ token });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async logout(req, res) {
        try {
            await AuthService.logout(req.user.id);
            return res.status(204).send();
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new AuthController();
