import React, { createContext, useState, useEffect, useContext } from 'react';

const PeopleContext = createContext();

const PeopleProvider = ({ children }) => {
  const [people, setPeople] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const fetchPeopleData = async () => {
      try {
        const response = await fetch('http://localhost:8080/pessoas'); 
        const data = await response.json();
        setPeople(data);
        setCurrentUser(data[0]); // Definindo o primeiro usuário como o usuário atual
      } catch (error) {
        console.error('Erro ao obter os dados das pessoas:', error);
      }
    };

    fetchPeopleData();
  }, []);

  return (
    <PeopleContext.Provider value={{ people, setPeople, currentUser, setCurrentUser }}>
      {currentUser && children}
    </PeopleContext.Provider>
  );
};

export { PeopleContext, PeopleProvider };

export default function usePeople() {
  return useContext(PeopleContext);
}
