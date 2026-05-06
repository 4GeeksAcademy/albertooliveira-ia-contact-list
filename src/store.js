export const initialStore = () => {
    return {
        contacts: [],
        message: null
    }
}

export default function storeReducer(store, action = {}) {
    switch (action.type) {
        case 'set_contacts':
            return {
                ...store,
                contacts: action.payload
            };
        case 'add_contact':
            return {
                ...store,
                contacts: [...store.contacts, action.payload]
            };
        case 'delete_contact':
            return {
                ...store,
                contacts: store.contacts.filter(contact => contact.id !== action.payload)
            };
        case 'update_contact':
            return {
                ...store,
                contacts: store.contacts.map(contact => 
                    contact.id === action.payload.id ? action.payload : contact
                )
            };
        default:
            return store;
    }
}

export const actions = {
    getContacts: async (dispatch) => {
        try {
            const response = await fetch("https://playground.4geeks.com/contact/agendas/alberto_oliveira/contacts");
            if (response.ok) {
                const data = await response.json();
                dispatch({ type: 'set_contacts', payload: data.contacts });
            } else if (response.status === 404) {
                // Si la agenda no existe, la creamos primero
                const createResp = await fetch("https://playground.4geeks.com/contact/agendas/alberto_oliveira", { method: "POST" });
                if (createResp.ok) actions.getContacts(dispatch);
            }
        } catch (error) {
            console.error("Error loading contacts:", error);
        }
    },

    addContact: async (newContact, dispatch) => {
        try {
            const response = await fetch("https://playground.4geeks.com/contact/agendas/alberto_oliveira/contacts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newContact)
            });
            if (response.ok) {
                const data = await response.json();
                dispatch({ type: 'add_contact', payload: data });
                return true;
            }
        } catch (error) {
            console.error("Error adding contact:", error);
            return false;
        }
    },

    deleteContact: async (id, dispatch) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/alberto_oliveira/contacts/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                dispatch({ type: 'delete_contact', payload: id });
                return true;
            }
        } catch (error) {
            console.error("Error deleting contact:", error);
            return false;
        }
    },

    updateContact: async (id, updatedContact, dispatch) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/alberto_oliveira/contacts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedContact)
            });
            if (response.ok) {
                const data = await response.json();
                dispatch({ type: 'update_contact', payload: data });
                return true;
            }
        } catch (error) {
            console.error("Error updating contact:", error);
            return false;
        }
    }
};
