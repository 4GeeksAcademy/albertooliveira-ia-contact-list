import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { actions } from "../store.js";
import { Link, useNavigate, useParams } from "react-router-dom";

export const AddContact = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const { id } = useParams();

    const [contact, setContact] = useState({
        name: "", email: "", phone: "", address: ""
    });

    useEffect(() => {
        if (id && store.contacts.length > 0) {
            const contactToEdit = store.contacts.find(c => c.id == id);
            if (contactToEdit) setContact(contactToEdit);
        }
    }, [id, store.contacts]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let success;
        
        if (id) {
            success = await actions.updateContact(id, contact, dispatch);
        } else {
            success = await actions.addContact(contact, dispatch);
        }

        if (success) navigate("/");
        else alert("Hubo un error al procesar la solicitud.");
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center font-weight-light mb-4">{id ? "Edit Contact" : "Add a new contact"}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label font-weight-bold">Full Name</label>
                    <input type="text" className="form-control" placeholder="Full Name" value={contact.name} onChange={(e) => setContact({...contact, name: e.target.value})} required />
                </div>
                <div className="mb-3">
                    <label className="form-label font-weight-bold">Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" value={contact.email} onChange={(e) => setContact({...contact, email: e.target.value})} required />
                </div>
                <div className="mb-3">
                    <label className="form-label font-weight-bold">Phone</label>
                    <input type="text" className="form-control" placeholder="Enter phone" value={contact.phone} onChange={(e) => setContact({...contact, phone: e.target.value})} required />
                </div>
                <div className="mb-3">
                    <label className="form-label font-weight-bold">Address</label>
                    <input type="text" className="form-control" placeholder="Enter address" value={contact.address} onChange={(e) => setContact({...contact, address: e.target.value})} required />
                </div>
                <button type="submit" className="btn btn-primary w-100 rounded-0 mt-3">save</button>
                <Link to="/" className="mt-3 d-block text-center text-primary font-weight-light">or get back to contacts</Link>
            </form>
        </div>
    );
};