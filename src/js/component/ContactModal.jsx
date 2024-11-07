import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';

const ContactModal = ({ show, handleClose, contact, handleEdit, handleDelete }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{contact.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center">
                    <img
                        src="https://picsum.photos/170/170/"
                        alt="Contact"
                        className="img-fluid rounded-circle mb-3"
                    />
                    <h5>{contact.name}</h5>
                    <p>{contact.phone}</p>
                    <p>{contact.email}</p>
                    <p>{contact.address}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => handleEdit(contact.id)}>
                    <FontAwesomeIcon icon={faPencilAlt} className="me-2" /> Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(contact.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ContactModal;