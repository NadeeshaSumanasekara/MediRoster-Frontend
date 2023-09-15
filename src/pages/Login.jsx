import React, { useState } from 'react';
import avatar from '../data/avatar.jpg';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useStateContext();
     

    const handleMainAppPage = (event) => {
        event.preventDefault();
        if (!email || !password) {
            alert("Please enter both email and password");
            return;
        }

        fetch("login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            if (data) {
                login({ role: 'doctor' });
                navigate("/");
                // Redirect to the main app page or handle success
            } else {
                alert("User data not found in the response.");
            }
        })
        .catch((error) => {
            console.error("Error:", error.message);
            alert("An error occurred during login.");
        });
    };

    const containerStyles = {
        backgroundImage: `url(${avatar})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center', 
         // Ensure the container covers the full viewport height
    }; 
    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden w-screen" style={containerStyles}>
            <div className="w-full p-6 ms-48 bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-blue-700 underline">
                   Sign in
                </h1>
                <form className="mt-6">
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <a
                        href="#"
                        className="text-xs text-blue-600 hover:underline"
                    >
                        Forget Password?
                    </a>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" 
                        onClick={handleMainAppPage}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
