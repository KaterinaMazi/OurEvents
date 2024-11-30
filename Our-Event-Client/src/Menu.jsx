import { Outlet, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';

function Menu() {
    const location = useLocation();
    const [eventId, setEventId] = useState(null);

    useEffect(() => {
        const pathParts = location.pathname.split('/');
        const id = pathParts[2];

        if (pathParts.length > 2 && pathParts[1] === 'events') {
            setEventId(id);
        } else if (pathParts[1] === 'Contact') {
            const storedEventId = localStorage.getItem('eventId');
            if (storedEventId) {
                setEventId(storedEventId);
            }
        } else {
            setEventId(null);
        }
    }, [location]);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#2C3E50' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand text-light pb-2" to="/">Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {eventId && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link text-light" to={`/events/${eventId}/activities`} style={{ fontWeight: '500' }}>Activities</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-light" to={`/events/${eventId}/ourpartners`} style={{ fontWeight: '500' }}>Our Partners</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-light" to={`/events/${eventId}/gallery`} style={{ fontWeight: '500' }}>Gallery</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-light" to="/Contact" style={{ fontWeight: '500' }}>Contact</Link>
                                    </li>
                                </>
                            )}
                        </ul>

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link text-light" style={{ fontWeight: '500' }}href="https://www.linkedin.com/in/katerina-mazi/" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin style={{ fontSize: '25px', fontWeight: '500' }} />
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-light" href="mailto:katerinaaliki1989@gmail.com">
                                    <FaEnvelope style={{ fontSize: '25px', marginBottom:"0.1rem", fontWeight: '500' }} />
                                    <span style={{ marginLeft: '10px', fontWeight: '500' }}>katerinaaliki1989@gmail.com</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/Logout" style={{ fontWeight: '500' }}>Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Outlet />
        </>
    );
}

export default Menu;
