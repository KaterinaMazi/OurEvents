import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Alert, ListGroup, Spinner, Card } from 'react-bootstrap';

const OurPartners = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch(`/api/events/${id}/partners/`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          setError(true);
          setMessage('You do not have access to this content!');
        } else {
          const data = await response.json();
          setPartners(data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching partners:', error);
        setError(true);
        setMessage('Error loading the partners. Please try again.');
        setLoading(false);
      }
    };

    fetchPartners();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <div>Φόρτωση...</div>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center" style={{ color: '#ecbf39', fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>Our Partners</h2>

      {message && (
        <Alert className="mt-3" variant={error ? 'danger' : 'success'}>
          {message}
        </Alert>
      )}

      {partners.length === 0 && !error ? (
        <Alert className="mt-3 text-center" variant="info">
          Δεν βρέθηκαν συνεργάτες για αυτήν την εκδήλωση.
        </Alert>
      ) : (
        <ListGroup className="mt-3">
          {partners.map((partner) => (
            <ListGroup.Item
            key={partner.id}
            className="list-group-item-action shadow-lg p-3 mb-3 rounded"
            style={{
              background: 'radial-gradient(circle, rgba(41,49,87,1) 0%, rgba(51,55,68,1) 86%)',
              border: "0",
            }}
            >
              <div className="d-flex align-items-center ">
                {partner.logo && (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      marginRight: '20px',
                      borderRadius: '50%',
                      border: '2px solid #ddd',
                    }}
                  />
                )}
                <div>
                  <h5 className="mb-3 fs-4" style={{ color:"#ffffff" }} >{partner.name}</h5>
                  {partner.description && (
                    <p className="mb-3 fs-5" 
                      style={{ 
                      color:"#c6c7cc", 
                      fontFamily: 'Poppins, sans-serif' 
                    }}>{partner.description}</p>
                  )}
                  {partner.link_page && (
                    <a
                      href={partner.link_page}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-3" 
                      style={{ 
                      color:"#ecbf39",
                      textDecoration: 'underline' 
                    }}
                    >
                      Visit {partner.name}'s page
                    </a>
                  )}
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {error && (
        <Button variant="outline-primary" className="mt-4" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      )}
    </Container>
  );
};

export default OurPartners;
