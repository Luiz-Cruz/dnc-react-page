import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Paper, Typography, Grid, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import usePeople from '@/contexts/peopleContext';
import useDialog from '@/contexts/dialogContext';

const Cadastro = () => {
  const { handleSubmit, control, reset } = useForm();
  const { people, setPeople } = usePeople();
  const {openDialog} = useDialog();
  const [possibleSpecialities, setPossibleSpecialities] = useState([]);

  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        // const response = await fetch('http://localhost:8080/especialidades');
        // const data = await response.json();
        const data = [
          'React', 'Vue', 'Angular', 'Node', 'Python', 'Java', 'C#', 'Ruby', 'PHP', 'SQL', 
          'NoSQL', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'Firebase', 
          'MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'MariaDB'
        ];
        setPossibleSpecialities(data);
      } catch (error) {
        console.error('Erro ao obter as especialidades:', error);
      }
    };

    fetchSpecialities();
  }, []);
  const handleAddDeveloper = (data) => {
    openDialog({
      title: 'Tem certeza que deseja cadastrar ' + data.name + '?',
      content: 'Após cadastrado, o desenvolvedor não poderá ser removido da base.',
      onConfirm: () => handleConfirm(data),
    });
  }

  const handleConfirm = (newDeveloper) => {
    setPeople([...people, {id: people.length + 1, ...newDeveloper}]);
    reset();
  };

  return (
    <Paper style={{ padding: '20px', maxWidth: '600px', margin: '20px auto' }}>
      {/* Título */}
      <Typography variant="h6" gutterBottom>
        Cadastro de Desenvolvedor
      </Typography>
      <form onSubmit={handleSubmit(handleAddDeveloper)}>
        <Grid container spacing={2}>
          {/* Campo: Nome */}
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Nome" variant="outlined" fullWidth required />
              )}
            />
          </Grid>
          {/* Campo: Experiência */}
          <Grid item xs={12}>
            <Controller
              name="experience"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Experiência (anos)"
                  variant="outlined"
                  type="number"
                  fullWidth
                  required
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                />
              )}
            />
          </Grid>
          {/* Campo: Especialidades */}
          <Grid item xs={12}>
            <Controller
              name="specialities"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Especialidades"
                  variant="outlined"
                  select
                  fullWidth
                  required
                  SelectProps={{ multiple: true }}
                >
                  {possibleSpecialities.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          {/* Campo: Cidade */}
          <Grid item xs={12}>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              rules={{
                pattern: {
                  value: /.* - [A-Z]{2}$/,
                  message: "A cidade deve terminar com a sigla do estado em maiúsculas"
                }
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Cidade"
                  variant="outlined"
                  fullWidth
                  required
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          {/* Botão de cadastro */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Cadastro;
