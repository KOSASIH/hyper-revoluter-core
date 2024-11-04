import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Import CSS for styling

const Footer = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscription = (e) => {
        e.preventDefault();
        // Here you would typically send the email to your backend for processing
        console.log(`Subscribed with email: ${email}`);
        setIsSubscribed(true);
        setEmail('');
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/nfts">NFT Marketplace</Link></li>
                        <li><Link to="/defi">DeFi</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
                <div className="footer-social">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <img src="/icons/twitter.svg" alt="Twitter" />
                        </a>
                        <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <img src="/icons/facebook.svg" alt="Facebook" />
                        </a>
                        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <img src="/icons/linkedin.svg" alt="LinkedIn" />
                        </a>
                        <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <img src="/icons/github.svg" alt="GitHub" />
                        </a>
                    </div>
                </div>
                <div className="footer-newsletter">
                    <h4>Subscribe to Our Newsletter</h4>
                    <form onSubmit={handleSubscription}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-label="Email for newsletter subscription"
                        />
                        <button type="submit">Subscribe</button>
                    </form>
                    {isSubscribed && <p>Thank you for subscribing!</p>}
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Hyper Revoluter. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
