import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Alert, ListGroup, Spinner, Card } from 'react-bootstrap';

const Activities = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`/api/events/${id}/activities/`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          setError(true);
          setMessage('You do not have access to this content!');
        } else {
          const data = await response.json();
          setActivities(data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError(true);
        setMessage('Σφάλμα κατά την φόρτωση δραστηριοτήτων. Δοκιμάστε ξανά.');
        setLoading(false);
      }
    };

    fetchActivities();
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
      <h2 className="text-dark mb-4 text-center">Activities</h2>

      {message && (
        <Alert className="mt-3 text-center" variant={error ? 'danger' : 'success'}>
          {message}
        </Alert>
      )}

      {activities.length === 0 && !error ? (
        <Alert className="mt-3 text-center" variant="info">
          No activities were found for this event.
        </Alert>
      ) : (
        <ListGroup className="mt-3">
          {activities.map((activity) => (
            <ListGroup.Item
              key={activity.id}
              className="list-group-item-action shadow-lg p-3 mb-3 rounded"
              style={{
                backgroundColor: '#f5f5f0',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e0e0e0';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0px 8px 20px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f5f5f0';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.1)';
              }}
            >
              <Card.Body style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <Card.Title className="text-dark">{activity.name}</Card.Title>
                  {activity.description && (
                    <Card.Text className="text-secondary">{activity.description}</Card.Text>
                  )}
                  {activity.max_participants && (
                    <Card.Text className="text-muted">Max Participants: {activity.max_participants}</Card.Text>
                  )}
                </div>

                {activity.image && (
                  <div style={{ flexShrink: 0, marginLeft: '20px' }}>
                    <img
                      src={activity.image}
                      alt={activity.name}
                      style={{
                        maxWidth: '300px',
                        width: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <div
                      style={{
                        fontSize: '12px',
                        color: '#777',
                        marginTop: '8px',
                        textAlign: 'center',
                      }}
                    >
                    </div>
                  </div>
                )}
              </Card.Body>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {error && (
        <div className="text-center">
          <Button variant="outline-primary" className="mt-4" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Activities;