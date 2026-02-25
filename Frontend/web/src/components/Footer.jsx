import React from 'react';
import { Link } from 'react-router-dom';
import { Flower2 } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                    <Link to="/" className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="text-emerald-500">
                            <Flower2 size={24} />
                        </span>
                        Happy Flowers
                    </Link>

                    <p className="text-sm">
                        Premium Anthurium nursery. We bring the beauty of nature right to your doorstep.
                    </p>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Shop</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/catalog" className="hover:text-emerald-400 transition-colors">All Plants</Link></li>
                        <li><Link to="/catalog?category=Red" className="hover:text-emerald-400 transition-colors">Red Anthuriums</Link></li>
                        <li><Link to="/catalog?category=Hybrid" className="hover:text-emerald-400 transition-colors">Rare Hybrids</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Account</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/login" className="hover:text-emerald-400 transition-colors">Login</Link></li>
                        <li><Link to="/register" className="hover:text-emerald-400 transition-colors">Register</Link></li>
                        <li><Link to="/dashboard" className="hover:text-emerald-400 transition-colors">Order Status</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
                    <p className="text-sm mb-2">123 Nursery Lane, Colombo</p>
                    <p className="text-sm">support@happyflowers.com</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs opacity-60">
                © {new Date().getFullYear()} Happy Flowers. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
