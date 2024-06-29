import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import usePeople from '@/contexts/peopleContext';

const InfoSection = () => {
  const { people } = usePeople();

  const { totalPeople, averageSpecialties, averageExperience, uniqueCities } = {
    totalPeople: people.length,
    averageSpecialties: (people.reduce((acc, person) => acc + person.specialties.length, 0) / people.length).toFixed(1),
    averageExperience: (people.reduce((acc, person) => acc + person.experience, 0) / people.length).toFixed(1),
    uniqueCities: [...new Set(people.flatMap(person => person.city))].length,
  }

  const infoCards = [
    { title: 'Total de desenvolvedores', value: totalPeople },
    { title: 'Média de especialidades', value: averageSpecialties },
    { title: 'Experiência média (anos)', value: averageExperience },
    { title: 'Total de cidades', value: uniqueCities },
  ];

  return (
    <>
      {infoCards.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper elevation={3} style={{padding: '20px', textAlign: 'center'}}>
            <Typography noWrap variant="h6">{card.title}</Typography>
            <Typography noWrap variant="h4">{card.value}</Typography>
          </Paper>
        </Grid>
      ))}
    </>
  );
};

export default InfoSection;
