import {Outlet} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import {ToastContainer} from "react-toastify";
import React from "react";

const Layout = () => {
    return (
        <div className="App flex flex-col min-h-screen bg-gray-100">
            <header className="w-full bg-white shadow-md">
                <Header />
            </header>

            <main className="flex-grow flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
            <Outlet />
                      <ToastContainer />
            </main>
            <footer className="w-full bg-gray-800 text-black">
                <Footer />
            </footer>

        </div>
    );
};

export default Layout;