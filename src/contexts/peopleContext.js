import React, { createContext, useState, useEffect, useContext } from 'react';

const PeopleContext = createContext();

const PeopleProvider = ({ children }) => {
  const [people, setPeople] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const fetchPeopleData = async () => {
      try {
        // const response = await fetch('http://localhost:8080/pessoas');
        // const data = await response.json();
        const data = [
          {
            "id": 1,
            "name": "Julinhos",
            "specialties": ["Front-end", "React"],
            "city": "São Paulo",
            "experience": 3
          },
          {
            "id": 1,
            "name": "Julinhos",
            "specialties": ["Front-end", "React"],
            "city": "São Paulo",
            "experience": 3
          },
          {
            "id": 2,
            "name": "Ciclano Silva",
            "specialties": ["Back-end", "Node.js"],
            "city": "Rio de Janeiro",
            "experience": 59
          },
          {
            "id": 3,
            "name": "Karen Oliveira",
            "specialties": ["Mobile", "React Native"],
            "city": "Belo Horizonte",
            "experience": 10
          }
        ];
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
