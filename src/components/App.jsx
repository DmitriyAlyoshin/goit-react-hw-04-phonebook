import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Title, Subtitle, Container } from './App.styled';
import { initialContacts } from 'data/initialContacts';
import { useLocalStorage } from 'hooks/useLocalStorage';

let LS_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage(LS_KEY, initialContacts);
  const [filter, setFilter] = useState('');
 
  const handlerSubmit = newContact => {
    
      if (contacts.find(contact => contact.name === newContact.name)) {
        Notiflix.Notify.warning(`${newContact.name} is already in contacts`, {
          position: 'center-top',
          fontSize: '15px',
        });
        return;
      }
    setContacts(prevContacts => [newContact, ...prevContacts]);
  };

  const onFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={handlerSubmit} />

      <Subtitle>Contacts</Subtitle>
      <Filter value={filter} onFilter={onFilter} />
      <ContactList deleteContact={deleteContact} contacts={filteredContacts} />
    </Container>
  );
};
