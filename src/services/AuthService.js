import axios from 'axios';
import { getSecureStorage, setSecureStorage, removeSecureStorage } from './secureStorage'; // Assume you have a secure storage utility
import { logError } from './logger'; // Assume you have a logging utility

const API_URL = process.env.REACT_APP_API_URL || 'https://api.yourservice.com'; // Use environment variable for API URL
const TOKEN_EXPIRY_BUFFER = 300; // 5 minutes buffer before token expiry

const AuthService = {
    // Function to log in a user
    login: async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/login`, { username, password });
            if (response.data.token) {
                setSecureStorage('user', response.data); // Store user data securely
            }
            return response.data;
        } catch (error) {
            logError('Login failed', error); // Log the error
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    },

    // Function to log out a user
    logout: () => {
        removeSecureStorage('user'); // Remove user data securely
    },

    // Function to fetch user data
    getUser Data: async () => {
        const user = getSecureStorage('user');
        if (!user || !user.token) {
            throw new Error('User  not authenticated');
        }

        try {
            const response = await axios.get(`${API_URL}/user`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            return response.data;
        } catch (error) {
            logError('Failed to fetch user data', error);
            throw new Error(error.response?.data?.message || 'Failed to fetch user data');
        }
    },

    // Function to register a new user
    register: async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/register`, { username, password });
            return response.data;
        } catch (error) {
            logError('Registration failed', error);
            throw new Error(error.response?.data?.message || 'Registration failed');
        }
    },

    // Function to refresh the token
    refreshToken: async () => {
        const user = getSecureStorage('user');
        if (!user || !user.refreshToken) {
            throw new Error('No refresh token available');
        }

        try {
            const response = await axios.post(`${API_URL}/refresh-token`, { token: user.refreshToken });
            if (response.data.token) {
                user.token = response.data.token; // Update the token
                setSecureStorage('user', user); // Store updated user data
            }
            return response.data;
        } catch (error) {
            logError('Failed to refresh token', error);
            throw new Error(error.response?.data?.message || 'Failed to refresh token');
        }
    },

    // Function to check if the token is expired
    isTokenExpired: (token) => {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiryTime = payload.exp * 1000; // Convert to milliseconds
        return Date.now() >= expiryTime - TOKEN_EXPIRY_BUFFER * 1000; // Check against buffer
    },

    // Function to handle API requests with retry logic
    apiRequest: async (method, url, data = null) => {
        const user = getSecureStorage('user');
        const headers = user && user.token ? { Authorization: `Bearer ${user.token}` } : {};

        try {
            const response = await axios({ method, url: `${API_URL}${url}`, data, headers });
            return response.data;
        } catch (error) {
            logError('API request failed', error);
            throw new Error(error.response?.data?.message || 'API request failed');
        }
    },
};

export default AuthService;
