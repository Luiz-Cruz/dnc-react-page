import React, { createContext, useState, useEffect, useContext } from 'react';
import { faker } from '@faker-js/faker';

const PeopleContext = createContext();

export const possibleSpecialties = [
  'React', 'Vue', 'Angular', 'Node', 'Python', 'Java', 'C#', 'Ruby', 'PHP', 'SQL', 
  'NoSQL', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'Firebase', 
  'MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'MariaDB'
];

export const possibleCities = [
  'São Paulo - SP', 'Rio de Janeiro - RJ', 'Belo Horizonte - MG', 'Porto Alegre - RS', 
  'Curitiba - PR', 'Recife - PE', 'Fortaleza - CE', 'Salvador - BA', 'Brasília - DF', 
  'Goiânia - GO', 'Cuiabá - MT', 'Campo Grande - MS', 'Florianópolis - SC', 'Vitória - ES', 
  'Natal - RN', 'João Pessoa - PB', 'Aracaju - SE', 'Maceió - AL', 'Teresina - PI', 
  'Boa Vista - RR', 'Manaus - AM', 'Belém - PA', 'Macapá - AP', 'Palmas - TO', 'Porto Velho - RO'
];

const PeopleProvider = ({ children }) => {
  const [people, setPeople] = useState();
  const [currentUser, setCurrentUser] = useState();

  const generateRandomPeople = (num) => {
    const randomPeople = [];
    for (let i = 0; i < num; i++) {
      randomPeople.push({
        id: i + 1,
        name: faker.person.fullName(),
        specialties: faker.helpers.arrayElements(possibleSpecialties, { min: 1, max: 5 }),
        city: faker.helpers.arrayElement(possibleCities),
        experience: Math.floor(Math.random() * 20) + 1
      });
    }
    return randomPeople;
  };

  useEffect(() => {
    const randomPeople = generateRandomPeople(20);

    setPeople(people || randomPeople);
    setCurrentUser(randomPeople[0]);
  }, [])

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