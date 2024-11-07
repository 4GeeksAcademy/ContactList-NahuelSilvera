import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../store/appContext';
import ContactModal from './ContactModal.jsx';

const CardContact = ({ contact }) => {
    const { store, actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false);

    const eliminarContacto = () => {
        actions.deleteContact(contact.id);
    };

    const handleEdit = (id) => {
        setShowModal(false);
        // Redirigir a la página de edición
    };

    const handleDelete = (id) => {
        eliminarContacto();
        setShowModal(false);
    };

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <>
            <tr>
                <th scope="row" className="ps-4">
                    <div className="form-check font-size-16">
                        <input type="checkbox" className="form-check-input" id={`contacusercheck${contact.id}`} />
                        <label className="form-check-label" htmlFor={`contacusercheck${contact.id}`}></label>
                    </div>
                </th>
                <td>
                    <img
                        src={contact.avatar}
                        alt="Contact"
                        className="avatar-sm rounded-circle me-2"
                    />
                    <a href="#" className="text-body" onClick={handleShow}>{contact.name}</a>
                </td>
                <td>{contact.phone}</td>
                <td>{contact.email}</td>
                <td>{contact.address}</td>
                <td>
                    <ul className="list-inline mb-0">
                        <li className="list-inline-item">
                            <Link to={"/editContact/" + contact.id} className="px-2 text-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit">
                                <FontAwesomeIcon icon={faPencilAlt} className="font-size-18" />
                            </Link>
                        </li>
                        <li className="list-inline-item">
                            <button type="button" className="px-2 text-danger" title="Delete" onClick={handleDelete}>
                                <FontAwesomeIcon icon={faTrashAlt} className="font-size-18" />
                            </button>
                        </li>
                    </ul>
                </td>
            </tr>
            <ContactModal
                show={showModal}
                handleClose={handleClose}
                contact={contact}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </>
    );
};

export default CardContact;