import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

const RegistrationPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [loading, setLoading] = useState(true);

    const currentUserId = 1;

    useEffect(() => {
        const checkRegistration = async () => {
            try {
                const response = await fetch(`/api/events/${id}/registered/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (response.ok || response.status === 404) {
                    const data = await response.json();
                    const userIsRegistered = data.registered
                    setIsRegistered(userIsRegistered);

                    if (userIsRegistered) {
                        setMessage('Σας ευχαριστούμε για την συμμετοχή σας! Θα χαρούμε να σας έχουμε κοντά μας.');
                        setError(false);
                    }
                } else {
                    setMessage('You do not have access to this content!');
                    setError(true);
                }
            } catch (error) {
                console.error('Error during registration check:', error);
                setMessage('Error checking registration. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        checkRegistration();
    }, [id, currentUserId]);

    const handleRegistration = async () => {
        try {
            const response = await fetch(`/api/events/${id}/registrations/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                setMessage('Σας ευχαριστούμε για την συμμετοχή σας! Θα χαρούμε να σας έχουμε κοντά μας.');
                setIsRegistered(true);
            } else {
                const errorData = await response.json();
                setMessage(`Αποτυχία δήλωσης συμμετοχής: ${errorData.detail || 'Άγνωστο σφάλμα.'}`);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setMessage('Error submitting participation. Please try again.');
        }
    };

    const handleWithdrawal = async () => {
        try {
            const response = await fetch(`/api/events/${id}/registrations/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                setMessage('Έχετε αποχωρήσει από το event.');
                setIsRegistered(false);
            } else {
                const errorData = await response.json();
                setMessage(`Αποτυχία αποχώρησης: ${errorData.detail || 'Άγνωστο σφάλμα.'}`);
            }
        } catch (error) {
            console.error('Error during withdrawal:', error);
            setMessage('Error during exit. Please try again.');
        }
    };

    if (loading) {
        return <div>Φόρτωση...</div>;
    }

    return (
        <div className="container mt-5">
            {!isRegistered && !error && (
                <>
                    <h5 style={{color: '#ecbf39'}}>Θα θέλατε να παρευρεθείτε στο event μας;</h5>
                    <button onClick={handleRegistration} className="btn btn-primary mt-3">Δηλώστε Συμμετοχή</button>
                </>
            )}

            {message && (
                <div className={`alert mt-3 ${error ? 'alert-danger' : 'alert-success'}`}>
                    {message}
                </div>
            )}

            {isRegistered && (
                <>
                    <h5 style={{color: '#ecbf39'}}>Εάν δεν μπορείτε να παραβρεθείτε, παρακαλούμε ενημερώστε μας έγκαιρα.</h5>
                    <button onClick={handleWithdrawal} className="btn btn-danger mt-3">Αποχώρω από το Event</button>
                </>
            )}
            {error && (
                <Button variant="primary" className='mt-3' onClick={() => navigate('/')}>
                    Back to Home
                </Button>
            )}
        </div>
    );
};

export default RegistrationPage;
