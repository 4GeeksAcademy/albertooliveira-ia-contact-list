import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { actions } from "../store.js";
import { Link } from "react-router-dom";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        actions.getContacts(dispatch);
    }, []);

    const confirmDelete = () => {
        if (selectedId) {
            actions.deleteContact(selectedId, dispatch);
            setSelectedId(null);
            const modalElement = document.getElementById('deleteModal');
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-end mb-3">
                <Link to="/add-contact">
                    <button className="btn btn-success">Add new contact</button>
                </Link>
            </div>
            
            <div className="list-group">
                {store.contacts && store.contacts.length > 0 ? (
                    store.contacts.map((contact) => (
                        <div key={contact.id} className="list-group-item d-flex justify-content-between align-items-center p-4 mb-1 border">
                            <div className="d-flex align-items-center">
                                <img 
                                    src="https://randomuser.me/api/portraits/men/18.jpg" 
                                    className="rounded-circle me-5 shadow-sm" 
                                    style={{width: "100px", height: "100px", objectFit: "cover"}} 
                                    alt="Profile" 
                                />
                                <div>
                                    <h4 className="mb-2 text-dark">{contact.name}</h4>
                                    <p className="mb-1 text-muted"><i className="fas fa-map-marker-alt me-3"></i>{contact.address}</p>
                                    <p className="mb-1 text-muted"><i className="fas fa-phone me-3"></i>{contact.phone}</p>
                                    <p className="mb-1 text-muted"><i className="fas fa-envelope me-3"></i>{contact.email}</p>
                                </div>
                            </div>
                            <div className="d-flex gap-4">
                                <Link to={`/edit-contact/${contact.id}`} className="btn btn-link text-dark p-0">
                                    <i className="fas fa-pencil-alt fa-lg"></i>
                                </Link>
                                <button 
                                    className="btn btn-link text-dark p-0" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#deleteModal"
                                    onClick={() => setSelectedId(contact.id)}
                                >
                                    <i className="fas fa-trash fa-lg"></i>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center mt-5 border p-5 bg-light">
                        <h3>No contacts yet</h3>
                        <p>Agenda: {store.agenda || "alberto_oliveira"}</p>
                    </div>
                )}
            </div>

            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h5 className="modal-title" id="deleteModalLabel">Are you sure?</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            If you delete this thing the entire universe will go down!
                        </div>
                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Oh no!</button>
                            <button type="button" className="btn btn-secondary" onClick={confirmDelete}>Yes baby!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};