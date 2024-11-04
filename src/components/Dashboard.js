import React, { useEffect, useState, useCallback } from 'react';
import AuthService from '../services/AuthService';
import { Line } from 'react-chartjs-2'; // Chart.js for data visualization
import Notification from './Notification'; // Assume you have a Notification component
import './Dashboard.css';

const Dashboard = () => {
    const [userData, setUser Data] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [chartData, setChartData] = useState({});

    const fetchUser Data = useCallback(async () => {
        try {
            const data = await AuthService.getUser Data();
            setUser Data(data);
            setChartData(generateChartData(data.recentTransactions)); // Generate chart data
        } catch (err) {
            setError('Failed to load user data');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser Data();

        // Set up WebSocket or polling for real-time updates
        const socket = new WebSocket('wss://your-websocket-url'); // Replace with your WebSocket URL
        socket.onmessage = (event) => {
            const newNotification = JSON.parse(event.data);
            setNotifications((prev) => [...prev, newNotification]);
            fetchUser Data(); // Refresh user data on new notification
        };

        return () => {
            socket.close(); // Clean up on unmount
        };
    }, [fetchUser Data]);

    const generateChartData = (transactions) => {
        const labels = transactions.map(tx => new Date(tx.date).toLocaleDateString());
        const data = transactions.map(tx => tx.amount); // Assuming transactions have an amount field

        return {
            labels,
            datasets: [
                {
                    label: 'Transaction Amount Over Time',
                    data,
                    fill: false,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                },
            ],
        };
    };

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
            <div className="chart-container">
                <h2>Transaction History</h2>
                <Line data={chartData} />
            </div>
            <div className="recent-activity">
                <h2>Recent Activity</h2>
                <ul>
                    {userData.recentTransactions.map((transaction, index) => (
                        <li key={index}>
                            <span>{new Date(transaction.date).toLocaleString()}</span>: {transaction.description}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="notifications">
                <h2>Notifications</h2>
                {notifications.length === 0 ? (
                    <p>No new notifications</p>
                ) : (
                    notifications.map((notification, index) => (
                        <Notification key={index} message={notification.message} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;
