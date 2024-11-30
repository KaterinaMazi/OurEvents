import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';

const GUEST_CREDENTIALS = {
  username: 'demo',
  password: '12345'
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const on_login = (event) => {
    event.preventDefault();
    login(username, password);
  };

  const on_demo_login = () => {
    login(GUEST_CREDENTIALS.username, GUEST_CREDENTIALS.password);
  };

  const login = async (username, password) => {
    const response = await fetch('/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });

    if (response.ok) {
      window.location.reload();
    } else {
      setError(true);
      setMessage('Invalid Credentials!');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="justify-content-center w-100">
        <Col md={6} lg={4}>
          <Card className="shadow-lg p-4 rounded"
            style={{
              background: 'linear-gradient(180deg, rgba(108,100,128,1) 0%, rgba(72,85,116,1) 49%, rgba(16,26,88,1) 100%)',
              border: "0",
            }}>
            <Card.Body style={{color: "white"}}>
              <h3 className="text-center mb-4" >Login</h3>
              {error && <Alert variant="danger">{message}</Alert>}
              <Form onSubmit={on_login}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="mb-3"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mb-3"
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 py-2" style={{ fontSize: '16px' }}>
                  Login
                </Button>
              </Form>

              <div className="text-center my-3">Or</div>

              <Button
                variant="secondary"
                onClick={on_demo_login}
                className="w-100 py-2"
                style={{ fontSize: '16px' }}
              >
                Try the Demo
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
