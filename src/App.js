import './App.css';
import { useState, useEffect } from 'react';
import Container from './components/Container';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';
import shortid from 'shortid';

function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase() || contact.number === number,
      )
    ) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };

    setContacts(prevContacts => [newContact, ...prevContacts]);
  };
  const changeFilter = ({ target }) => {
    setFilter(target.value);
  };

  const getvisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <>
      <Container title="Phonebook">
        <ContactForm onSubmit={addContact}></ContactForm>
        <Filter value={filter} onChange={changeFilter}></Filter>
        <ContactList contacts={getvisibleContacts()} onDelete={deleteContact} />
      </Container>
    </>
  );
}
export default App;
