import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Home from './Home.jsx';
import Activities from './Activities.jsx';
import OurPartners from './OurPartners.jsx';
import Gallery from './Gallery.jsx';
import Contact from './Contact.jsx';
import Login from './Login';
import Logout from './Logout';
import Event from './Event.jsx';
import RegistrationPage from './RegistrationPage.jsx';
import Menu from './Menu.jsx';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [checkAuthenticated, setCheckAuthenticated] = useState(false);

    const checkAuth = async () => {
        const response = await fetch('/api/check-auth/', {
            method: 'GET',
            credentials: 'include'
        });

        if (response.ok) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
        setCheckAuthenticated(true);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <div style={{ backgroundColor: '#f2ece4', minHeight: '100vh' }}>
            <BrowserRouter>
                <Routes>
                    {checkAuthenticated && !isAuthenticated ? (
                        <>
                            <Route path="/" element={<Login />} />
                        </>
                    ) : ''}
                    {checkAuthenticated && isAuthenticated ? (
                        <Route element={<Menu />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/events/:id" element={<Event />} />
                            <Route path="/events/:id/activities" element={<Activities />} />
                            <Route path="/events/:id/ourpartners" element={<OurPartners />} />
                            <Route path="/events/:id/gallery" element={<Gallery />} />
                            <Route path="/events/:id/registrations" element={<RegistrationPage />} />
                            <Route path="/Contact" element={<Contact />} />
                            <Route path="/Logout" element={<Logout />} />
                        </Route>
                    ) : ''}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
