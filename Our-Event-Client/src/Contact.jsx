import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, message } = formData;

    if (!name || !message) {
      setIsError(true);
      setIsSubmitted(false);
      return;
    }

    const mailtoLink = `mailto:katerina.aliki@hotmail.com?subject=Message from ${encodeURIComponent(
      name
    )}&body=${encodeURIComponent(`Name: ${name}\n\nMessage:\n${message}`)}`;

    window.location.href = mailtoLink;

    setIsSubmitted(true);
    setIsError(false);
  };

  return (
    <Container className="mt-5 text-center">
      <h2>Contact Us</h2>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            {isError && (
              <Alert variant="danger">
                Please fill in both fields before submitting.
              </Alert>
            )}
            {isSubmitted && !isError && (
              <Alert variant="success">
                Your message has been sent successfully!
              </Alert>
            )}

            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={isError && !formData.name}
              />
            </Form.Group>

            <Form.Group controlId="formMessage" className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter your message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                isInvalid={isError && !formData.message}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
