import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { useWallet } from '../hooks/useWallet'; // Custom hook for wallet connection
import './Navbar.css'; // Import CSS for styling

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser ] = useState(null);
    const { connectWallet, disconnectWallet, account } = useWallet(); // Hook for wallet management
    const history = useHistory();

    useEffect(() => {
        const checkAuth = async () => {
            const userData = await AuthService.getUser Data();
            if (userData) {
                setIsAuthenticated(true);
                setUser (userData);
            }
        };
        checkAuth();
    }, []);

    const handleLogout = async () => {
        await AuthService.logout();
        setIsAuthenticated(false);
        setUser (null);
        history.push('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Hyper Revoluter</Link>
            </div>
            <ul className="navbar-menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/nfts">NFT Marketplace</Link></li>
                <li><Link to="/defi">DeFi</Link></li>
                {isAuthenticated && (
                    <li><Link to="/dashboard">Dashboard</Link></li>
                )}
            </ul>
            <div className="navbar-actions">
                {isAuthenticated ? (
                    <>
                        <span className="user-greeting">Hello, {user.username}</span>
                        <button onClick={handleLogout} className="btn-logout">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn-login">Login</Link>
                        <Link to="/register" className="btn-register">Register</Link>
                    </>
                )}
                <button onClick={account ? disconnectWallet : connectWallet} className="btn-wallet">
                    {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
