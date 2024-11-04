import React, { useEffect, useState } from 'react';
import AuthService from '../services/AuthService';
import './Dashboard.css'; // Import CSS for styling

const Dashboard = () => {
    const [userData, setUser Data] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser Data = async () => {
            try {
                const data = await AuthService.getUser Data(); // Fetch user data from your service
                setUser Data(data);
            } catch (err) {
                setError('Failed to load user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUser Data();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="dashboard">
            <h1>Welcome, {userData.username}!</h1>
            <div className="dashboard-stats">
                <div className="stat-card">
                    <h2>Total NFTs</h2>
                    <p>{userData.nftCount}</p>
                </div>
                <div className="stat-card">
                    <h2>Total Balance</h2>
                    <p>{userData.balance} ETH</p>
                </div>
                <div className="stat-card">
                    <h2>Recent Transactions</h2>
                    <p>{userData.recentTransactions.length} transactions</p>
                </div>
            </div>
            <div className="recent-activity">
                <h2>Recent Activity</h2>
                <ul>
                    {userData.recentTransactions.map((transaction, index) => (
                        <li key={index}>
                            <span>{transaction.date}</span>: {transaction.description}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
