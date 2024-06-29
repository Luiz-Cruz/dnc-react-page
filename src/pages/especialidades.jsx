import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Paper, Typography, Grid } from '@mui/material';
import usePeople from '@/contexts/peopleContext';
import useDialog from '@/contexts/dialogContext';

const CadastroEspecialidades = () => {
  const { handleSubmit, control, reset } = useForm();
  const { openDialog } = useDialog();

  const handleAddSpecialities = (data) => {
    openDialog({
      title: 'Tem certeza que deseja cadastrar ' + data.name + '?',
      content: 'Após cadastrado, a especialidade não poderá ser removida da base.',
      onConfirm: () => handleConfirm(data),
    });
  };

  const handleConfirm = async (newSpeciality) => {
    try {
      const response = await fetch('http://localhost:8080/especialidades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSpeciality)
      });

      if (!response.ok) {
        throw new Error('Falha ao cadastrar especialidade');
      } 

      const addedSpeciality = await response.json();
      reset();
      alert('Especialidade cadastrada com sucesso!');
    } catch (error) {
      alert('Erro: ' + error.message);
    }
  };

  return (
    <Paper style={{ padding: '20px', maxWidth: '600px', margin: '20px auto' }}>
      <Typography variant="h6" gutterBottom>
        Cadastro de Especialidades
      </Typography>
      <form onSubmit={handleSubmit(handleAddSpecialities)}>
        <Grid container spacing={2}>
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

export default CadastroEspecialidades;