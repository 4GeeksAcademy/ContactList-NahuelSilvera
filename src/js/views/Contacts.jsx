import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Context } from "../store/appContext.js";
import CardContact from "../component/CardContact.jsx";

const Contacts = () => {
    const { store, actions } = useContext(Context);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        actions.getInfoContacts();
    }, []);

    const totalPages = Math.ceil(store.listContacts.length / itemsPerPage);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedContacts = store.listContacts.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="container">
            {store.listContacts.length > 0 ? (
                <>
                    <div className="row align-items-center mt-3">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <h5 className="card-title">Contactos <span className="text-muted fw-normal ms-2">({store.listContacts.length})</span></h5>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
                                <div>
                                    <Link to="/addContact" className="btn btn-primary">
                                        <FontAwesomeIcon icon={faPlus} className="me-1" /> Agregar nuevo
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="table-responsive">
                                <table className="table project-list-table table-nowrap">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="ps-4" style={{ width: "50px" }}>
                                                <div className="form-check font-size-16">
                                                    <input type="checkbox" className="form-check-input" id="contacusercheck" />
                                                    <label className="form-check-label" htmlFor="contacusercheck"></label>
                                                </div>
                                            </th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Teléfono</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Dirección</th>
                                            <th scope="col" style={{ width: "200px" }}>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedContacts.map((contact, index) => (
                                            <CardContact contact={contact} key={index} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row g-0 align-items-center pb-4">
                        <div className="col-sm-6">
                            <div><p className="mb-sm-0">Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, store.listContacts.length)} de {store.listContacts.length} entradas</p></div>
                        </div>
                        <div className="col-sm-6">
                            <div className="float-sm-end">
                                <ul className="pagination mb-sm-0">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <a href="#" className="page-link" onClick={handlePreviousPage}><FontAwesomeIcon icon={faChevronLeft} /></a>
                                    </li>
                                    {[...Array(totalPages).keys()].map(number => (
                                        <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                                            <a href="#" className="page-link" onClick={() => handlePageClick(number + 1)}>{number + 1}</a>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <a href="#" className="page-link" onClick={handleNextPage}><FontAwesomeIcon icon={faChevronRight} /></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
                    <h4 className="mb-3">No tienes contactos agregados</h4>
                    <Link to="/addContact" className="btn btn-primary">
                        <FontAwesomeIcon icon={faPlus} className="me-1" /> Agregar contacto
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Contacts;