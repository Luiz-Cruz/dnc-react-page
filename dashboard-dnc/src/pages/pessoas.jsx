import React, { useState } from 'react';
import usePeople from '../contexts/peopleContext';
import { Grid, Paper, Typography, Divider, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import InfoSection from '@/components/infoSection';

const Pessoas = () => {
  const { people } = usePeople();
  const [searchText, setSearchText] = useState('');

  const columns = [
    { field: 'name', headerName: 'Nome', flex: 2, minWidth: 200 },
    { field: 'specialties', headerName: 'Especialidades', flex: 2, minWidth: 200 },
    { field: 'city', headerName: 'Cidade', flex: 1, minWidth: 150},
    { field: 'experience', headerName: 'Experiência', maxWidth: 150, minWidth: 100 },
  ];

  const filteredPeople = people.filter(person =>
    person.name.toLowerCase().includes(searchText.toLowerCase()) ||
    person.city.toLowerCase().includes(searchText.toLowerCase()) ||
    person.specialties.some(specialty => specialty.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <Grid container spacing={1} p={1}>
      <InfoSection/>
      <Grid item xs={12}>
        <Paper style={{ padding: '20px' }}>
          {/* Título */}
          <Typography variant="h6" gutterBottom>
            Lista de Desenvolvedores
          </Typography>
          {/* Busca */}
          <TextField
            label="Buscar"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            fullWidth
            margin='normal'
          />
          {/* Tabela de Desenvolvedores */}
          <DataGrid
            rows={filteredPeople}
            columns={columns}
            initialState={{ pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            }}}
            pageSizeOptions={[10, 20, 50]}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Pessoas;
