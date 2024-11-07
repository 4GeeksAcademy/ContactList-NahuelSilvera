import React, { createContext, useState } from "react";

const Context = createContext(null);

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            listContacts: [],
            showToast: false,
            toastMessage: ""
        },
        actions: {
            createUser: () => {
                fetch("https://playground.4geeks.com/contact/agendas/4geeks-user", {
                    method: "POST",
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                    })
                    .catch((error) => console.log(error));
            },

            getInfoContacts: () => {
                return fetch("https://playground.4geeks.com/contact/agendas/4geeks-user/contacts", {
                    method: "GET"
                })
                    .then((response) => {
                        if (response.status == 404) {
                            getActions().createUser()
                        }
                        if (response.ok) {
                            return response.json()
                        }
                    })
                    .then((data) => {
                        if (data) {
                            setStore({ listContacts: data.contacts });
                        }
                    }) 
                    .catch((error => console.log(error)))
            },

            addContactToList: (contact) => {
                const store = getStore();
                setStore({ ...store, listContacts: [...store.listContacts, contact] });
            },

            createContact: (payload) => {
                fetch("https://playground.4geeks.com/contact/agendas/4geeks-user/contacts", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        const actions = getActions(); 
                        actions.addContactToList(data); 
                        console.log("Contact added:", data);
                    })
                    .catch((error) => console.log(error));
            },
            deleteContact: (id) => {
                fetch(`https://playground.4geeks.com/contact/agendas/4geeks-user/contacts/${id}`, {
                    method: "DELETE",
                })
                    .then((response) => {
                        if (response.ok) {
                            const store = getStore();
                            const updatedContacts = store.listContacts.filter(contact => contact.id !== id);
                            setStore({ listContacts: updatedContacts });
                            console.log(`Contact with ID ${id} deleted`);
                        } else {
                            console.log("Error deleting contact");
                        }
                    })
                    .catch((error) => console.log(error));
            },

            editContact: (id, contact) => {
                const store = getStore();
                fetch(`https://playground.4geeks.com/contact/agendas/4geeks-user/contacts/${id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(contact)
                })
                    .then((response) => {
                        if (response.ok) {
                            return response.json();
                        }
                    })
                    .then((data) => {
                        if (data) {
                            const updatedList = store.listContacts.map(contact => {
                                if (contact.id == id) {
                                    contact = data;
                                }
                                return contact;
                            });
                            setStore({ listContacts: updatedList, showToast: true, toastMessage: "Contacto modificado" });
                        }
                    })
                    .catch((error) => console.log(error));
            },
            hideToast: () => {
                setStore({ showToast: false, toastMessage: "" });
            }
        }
    }
};

const injectContext = PassedComponent => {
    const StoreWrapper = props => {
        const [state, setState] = useState(getState({
            getStore: () => state.store,
            getActions: () => state.actions,
            setStore: updatedStore =>
                setState({
                    store: Object.assign(state.store, updatedStore),
                    actions: { ...state.actions }
                })
        }));

        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };
    return StoreWrapper;
};

export { Context, injectContext };