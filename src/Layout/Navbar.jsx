import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import supabase from '../supabaseClient'; // Import the Supabase client


const Navbar = (user) => {
    const userinfo = user?.session?.user_metadata

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            console.log('User logged out successfully');
            // Optionally, redirect the user to the login page or another route
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };
    return (
        <nav className="bg-blue-200 min-w-full">
            <div className="min-w-screen mx-auto px-20">
                <div className="flex justify-between items-center py-4">
                    <div className="text-xl font-bold">Logo</div>
                    <div className="flex space-x-10">
                        <Link className="px-3 py-3 bg-blue-500 rounded-full hover:bg-grey" to="/shopping-cart">
                            <ShoppingCartIcon className="h-6 w-6 text-white" />
                        </Link>
                        <Link className="" to="/profile">
                            {userinfo?.avatar_url && <img className="rounded-full h-12 w-12" src={userinfo?.avatar_url} alt="Profile" />}
                        </Link>
                        <button onClick={() => setIsOpen(true)}>Logout</button>
                        {isOpen && (
                            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                                <div className="bg-white p-4 rounded-md">
                                    <p>Are you sure you want to logout?</p>
                                    <div className="flex justify-end mt-4">
                                        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md mr-2">Yes</button>
                                        <button onClick={() => setIsOpen(false)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
