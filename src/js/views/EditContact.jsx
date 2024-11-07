import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
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

    function guardarContacto(e) {
        e.preventDefault();
        if (name.trim() === "" || phone.trim() === "" || email.trim() === "" || address.trim() === "" || avatar === "") {
            alert("Campos vacíos");
            return;
        }
        
        const randomAvatar = avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`;
        
        const payload = {
            name: name,
            phone: phone,
            email: email,
            address: address,
            avatar: randomAvatar
        };
        if (!id) {
            actions.createContact(payload);
            setToastMessage("Contacto creado");
        } else {
            actions.editContact(id, payload);
            setToastMessage("Contacto modificado");
        }
        setShowToast(true);
        setTimeout(() => {
            navigate("/");
        }, 1000); // Navegar después de 1 segundo
        setTimeout(() => {
            setShowToast(false);
        }, 3000); // Ocultar el toast después de 3 segundos
        setName("");
        setPhone("");
        setEmail("");
        setAddress("");
        setAvatar("");
    }

    return (
        <div className="container mt-3">
            <h1 className="text-center">{!id ? "Agregar nuevo contacto" : `Editar Contacto: ${name}`}</h1>

            <form className="container" onSubmit={guardarContacto}>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput1" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="formGroupExampleInput1" placeholder="Nombre completo" onChange={(e) => setName(e.target.value)} value={name} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Email</label>
                    <input type="email" className="form-control" id="formGroupExampleInput2" placeholder="Ingresa email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput3" className="form-label">Teléfono</label>
                    <input type="text" className="form-control" id="formGroupExampleInput3" placeholder="Ingresa teléfono" onChange={(e) => setPhone(e.target.value)} value={phone} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput4" className="form-label">Dirección</label>
                    <input type="text" className="form-control" id="formGroupExampleInput4" placeholder="Ingresa dirección" onChange={(e) => setAddress(e.target.value)} value={address} required />
                </div>
                <div className="mb-3 d-flex justify-content-between">
                    <button type="submit" className="btn btn-secondary">Guardar</button>
                    <button type="button" className="btn btn-primary" onClick={() => navigate("/")}>Cancelar</button>
                </div>
            </form>

            <ToastContainer position="top-end" className="p-3">
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Éxito</strong>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default EditContact;