import { Accordion, ListGroup } from 'react-bootstrap';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const Events = ({ events }) => (
    <>
        {/* Inline CSS στο style tag */}
        <style>
            {`
                .accordion-button:after {
                    /* Custom arrow icon */
                    background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23ffffff'><path fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/></svg>") !important;
                }
                .accordion-button:not(.collapsed) {
                    /* Χρώμα για ενεργό κουμπί */
                    background-color: #292c35 !important;
                    color: #ffffff !important;
                }
                .accordion {
                    /* Αφαίρεση συνόρων */
                    border: none !important;
                }
                .accordion-item {
                    /* Αφαίρεση συνόρων */
                    border: none !important;
                }
                .accordion-button {
                    /* Αφαίρεση συνόρων και custom background */
                    border: none !important;
                    background: radial-gradient(circle, rgba(236,191,57,1) 0%, rgba(236,191,57,1) 55%, rgba(236,191,57,1) 100%);
                }
                .accordion-body {
                    /* Αφαίρεση συνόρων και custom background */
                    border: none !important;
                    background: radial-gradient(circle, rgba(62,82,63,1) 0%, rgba(128,127,100,1) 49%, rgba(16,26,88,1) 100%) !important;
                }
                .small-link {
                    /* Στυλ του Link */
                    color: #ffffff;
                    border: 0;
                }
                .small-link:hover {
                    /* Στυλ κατά το hover */
                    color: #ecbf39 !important;
                    text-decoration: underline; /* Προαιρετικό για υπογράμμιση */
                }
            `}
        </style>

        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <span
                        className="custom-button"
                        style={{
                            flex: '1',
                            textAlign: 'center',
                            fontSize: '25px',
                            color: 'white',
                            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
                            border: '0',
                        }}
                    >
                        Upcoming Events!
                    </span>
                </Accordion.Header>
                <Accordion.Body>
                    <ListGroup>
                        {events.map((event) => (
                            <ListGroup.Item
                                key={event.id}
                                className="small-item"
                                style={{
                                    background: 'linear-gradient(0deg, rgba(63,61,138,1) 35%, rgba(84,81,168,1) 58%)',
                                    border: '0'
                                }}
                            >
                                {/* Στυλ Link με hover */}
                                <Link
                                    to={`events/${event.id}`}
                                    className="text-decoration-none small-link"
                                >
                                    <span className="fs-5">{event.name}</span>
                                </Link>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </>
);

Events.propTypes = {
    events: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Events;
