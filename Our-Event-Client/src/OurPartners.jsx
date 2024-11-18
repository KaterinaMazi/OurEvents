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
      <h2 className="text-dark mb-4 text-center fw-bold">Our Partners</h2>

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
              className="list-group-item-action d-flex align-items-center shadow-sm mb-3"
              action
              variant="light"
              style={{
                transition: 'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
                backgroundColor: '#f9f9f9',
                borderRadius: '15px',
                padding: '15px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e0e0e0';
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                e.currentTarget.style.boxShadow = '0px 12px 30px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f9f9f9';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0px 6px 12px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div className="d-flex align-items-center">
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
                  <h5 className="text-dark fw-bold mb-1">{partner.name}</h5>
                  {partner.description && (
                    <p className="text-secondary mb-3 small">{partner.description}</p>
                  )}
                  {partner.link_page && (
                    <a
                      href={partner.link_page}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary fw-bold"
                      style={{ textDecoration: 'underline' }}
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
