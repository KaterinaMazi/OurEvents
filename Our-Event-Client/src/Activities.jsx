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
        setMessage('Error loading activities. Please try again.');
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
      <h2 className="mb-4 text-center" style={{ color: '#ecbf39', fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>Activities</h2>

      {message && (
        <Alert className="mt-3 text-center" variant={error ? 'danger' : 'success'}>
          {message}
        </Alert>
      )}

      {activities.length === 0 && !error ? (
        <Alert className="mt-3 text-center" variant="info">
          Δεν βρέθηκαν δραστηριότητες για αυτήν την εκδήλωση..
        </Alert>
      ) : (
        <ListGroup className="mt-3">
          {activities.map((activity) => (
            <ListGroup.Item
              key={activity.id}
              className="list-group-item-action shadow-lg p-3 mb-3 rounded"
              style={{
                background: 'radial-gradient(circle, rgba(41,49,87,1) 0%, rgba(51,55,68,1) 86%)',
                border: "0",
     
              }}
            >
              <Card.Body 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                color:"#ffffff", 
                justifyContent: 'space-between', 
                alignItems: 'center' 
                }}>
                <div style={{ flex: 1 }}>
                  <Card.Title className="mb-3 fs-4">{activity.name}</Card.Title>
                  {activity.description && (
                    <Card.Text className="mb-3 fs-5" 
                    style={{ 
                      color:"#c6c7cc", 
                      fontFamily: 'Poppins, sans-serif' 
                    }}>{activity.description}</Card.Text>
                  )}
                  {activity.max_participants > 0 ? (
                    <Card.Text className="mb-3" 
                    style={{ 
                      color:"#ffffff" 
                    }}>Max Participants: {activity.max_participants}</Card.Text>
                  ): null} 
                </div>

                {activity.image && (
                  <div style={{ flexShrink: 0 }}>
                    <img
                      src={activity.image}
                      alt={activity.name}
                      style={{
                        maxWidth: '300px',
                        width: '100%',
                        height: 'auto',
                      }}
                    />
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
