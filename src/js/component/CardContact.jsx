import React, { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../store/appContext';

const CardContact = ({ contact }) => {
    const { store, actions } = useContext(Context);
    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        // Obtiene el avatar del contacto desde localStorage
        const storedAvatar = localStorage.getItem(`contact-avatar-${contact.id}`);
        
        if (storedAvatar) {
            // Si existe un avatar guardado (base64), lo usamos
            setAvatar(storedAvatar);
        } else {
            // Si no hay avatar, genera un color de fondo aleatorio
            const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`; // Color aleatorio
            const avatarIcon = randomColor;
            
            // Guardamos el color de fondo generado
            localStorage.setItem(`contact-avatar-${contact.id}`, randomColor); // Guardamos el color
            setAvatar(avatarIcon);
        }
    }, [contact.id]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result;
                localStorage.setItem(`contact-avatar-${contact.id}`, base64Image);
                setAvatar(base64Image);
            };
            reader.readAsDataURL(file);
        }
    };

    const eliminarContacto = () => {
        actions.deleteContact(contact.id);
        localStorage.removeItem(`contact-avatar-${contact.id}`); // Elimina el avatar almacenado al borrar el contacto
    };

    const handleDelete = () => {
        eliminarContacto();
    };

    return (
        <tr>
            <th scope="row" className="ps-4">
                <div className="form-check font-size-16">
                    <input type="checkbox" className="form-check-input" id={`contacusercheck${contact.id}`} />
                    <label className="form-check-label" htmlFor={`contacusercheck${contact.id}`}></label>
                </div>
            </th>
            <td>
                <div className="d-flex align-items-center">
                    {avatar.startsWith("data:image") ? (
                        <img
                            src={avatar}
                            alt="Contact"
                            className="avatar-sm rounded-circle me-2"
                        />
                    ) : (
                        <div
                            style={{
                                backgroundColor: avatar, 
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <FontAwesomeIcon icon={faUser} style={{ color: "white", fontSize: "20px" }} />
                        </div>
                    )}
                    <a href="#" className="text-body px-2">{contact.name}</a>
                </div>
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
    );
};

export default CardContact;
