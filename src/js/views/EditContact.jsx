import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from "../store/appContext.js";
import { Toast, ToastContainer } from 'react-bootstrap';

const EditContact = () => {
    const { store, actions } = useContext(Context);
    let navigate = useNavigate();
    const { id } = useParams(); 

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [avatar, setAvatar] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {
        if (id && store.listContacts.length > 0) {
            const currentContact = store.listContacts.find(contact => contact.id == id);
            if (currentContact) {
                setName(currentContact.name);
                setPhone(currentContact.phone);
                setEmail(currentContact.email);
                setAddress(currentContact.address);
                setAvatar(currentContact.avatar);
            }
        }
    }, [id, store.listContacts]);

    function handleImageUpload(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
                localStorage.setItem(`contact-avatar-${id}`, reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    function guardarContacto(e) {
        e.preventDefault();
        if (name.trim() === "" || phone.trim() === "" || email.trim() === "" || address.trim() === "") {
            alert("Campos vacíos");
            return;
        }

        const payload = {
            name,
            phone,
            email,
            address,
            avatar
        };

        actions.editContact(id, payload);
        setToastMessage("Contacto modificado");
        setShowToast(true);
        setTimeout(() => navigate("/"), 1000);
    }

    return (
        <div className="container mt-3">
            <h1 className="text-center">Editar Contacto: {name}</h1>

            <form onSubmit={guardarContacto}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="name" placeholder="Nombre completo" onChange={(e) => setName(e.target.value)} value={name} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Ingresa email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Teléfono</label>
                    <input type="text" className="form-control" id="phone" placeholder="Ingresa teléfono" onChange={(e) => setPhone(e.target.value)} value={phone} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Dirección</label>
                    <input type="text" className="form-control" id="address" placeholder="Ingresa dirección" onChange={(e) => setAddress(e.target.value)} value={address} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="avatar" className="form-label">Avatar</label>
                    <input type="file" className="form-control" id="avatar" onChange={handleImageUpload} />
                </div>
                <button type="submit" className="btn btn-secondary">Guardar</button>
                {/* Botón de cancelar */}
                <button type="button" className="btn btn-primary ms-2" onClick={() => navigate("/")}>Cancelar</button>
            </form>

            <ToastContainer position="top-end" className="p-3">
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                    <Toast.Header><strong className="me-auto">Éxito</strong></Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default EditContact;
