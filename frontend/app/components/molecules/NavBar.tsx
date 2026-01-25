import React from "react";
import { Link } from "react-router";

export const NavBar = () => {
    return (
        <nav className="flex m-1 space-x-4 p-4 bg-primary-100 text-primary-900 rounded-2xl align-middle shadow-md items-center justify-center">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/login" className="bg-pink-700 text-amber-50 rounded-2xl px-4 py-1">Login</Link>
        </nav>
    );
};