import React, { useEffect, useState } from 'react';
import { Alert, Nav, Button, Container, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Photos from './Photos';
import Videos from './Videos';
import 'bootstrap/dist/css/bootstrap.min.css';

const Gallery = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [media, setMedia] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('images');

  const fetchMedia = async () => {
    try {
      const response = await fetch(`/api/events/${id}/media/`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        setError(true);
        setMessage('You do not have access to this content!');
      } else {
        const data = await response.json();
        setMedia(data);
      }
    } catch (error) {
      console.error('Σφάλμα κατά την ανάκτηση μέσων:', error);
      setError(true);
      setMessage('Failed to retrieve the media.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [id]);

  const images = media.filter(item => item.file_type === 'image');
  const videos = media.filter(item => item.file_type === 'video');

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center" style={{ color: '#ecbf39', fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>Gallery</h2>

      {message && (
        <Alert variant={error ? 'danger' : 'success'}>
          {message}
        </Alert>
      )}

      {error && (
        <div className="text-center">
          <Button variant="primary" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      )}

      {!error && loading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {!error && !loading && (
        <>
          <Nav
            variant="tabs"
            activeKey={activeTab}
            onSelect={(key) => setActiveTab(key)}
            className="mb-4 fs-5"
            justify
          >
            <Nav.Item>
              <Nav.Link
                eventKey="images"
                style={{
                  backgroundColor: activeTab === 'images' ? '#041221' : 'transparent',
                  color: activeTab === 'images' ? '#ecbf39' : '#fff',
                }}
              >
                Φωτογραφίες
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="videos"
                style={{
                  backgroundColor: activeTab === 'videos' ? '#041221' : 'transparent',
                  color: activeTab === 'videos' ? '#ecbf39' : '#fff',
                }}
              >
                Βίντεο
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {activeTab === 'images' ? (
            <Photos images={images} />
          ) : (
            <Videos videos={videos} />
          )}
        </>
      )}
    </Container>
  );
};

export default Gallery;
