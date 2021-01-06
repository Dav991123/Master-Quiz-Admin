import React, { useContext, useState, useEffect } from 'react';
import AdminContext from '../../../context/adminContext';
import { SET_IS_AUTH } from '../../../core/constants/actionTypes'
import { 
    Box,
    Grid,
    Button, 
    Avatar, 
    Checkbox,
    TextField, 
    CssBaseline, 
    FormControlLabel, 
 } from '@material-ui/core'
import { useStyles } from './useStyles';
import { Copyright } from './copyright';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useForm } from '../../../hooks/useForm';
import { validateModal } from '../../../core/validateModal';
import { base } from '../../../core/firebase/base';

const Login = () => {
  const { dispatch } = useContext(AdminContext);

  const classes = useStyles();
  const { values, errors, onFocus, isEnable, handleChange, handleOutsideClick } = useForm(
    {
      email: '',
      password: ''
    },
    validateModal
  )

const handleLogin = e => {
    e.preventDefault();
    const { email, password } = values;
    base.auth().signInWithEmailAndPassword(email, password)
    .then(data => {
      console.log(data);
      dispatch({
        type: SET_IS_AUTH,
        payload: true
      })
    })
    .catch(error => {
      dispatch({
        type: SET_IS_AUTH,
        payload: false
      })
    })
}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            helperText={errors.email}
            error={errors.email}
            onChange={handleChange}
            onBlur={handleOutsideClick}
            onFocus={onFocus}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            helperText={errors.password}
            error={errors.password}
            onChange={handleChange}
            onBlur={handleOutsideClick}
            onFocus={onFocus}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isEnable}
          >
            Sign In
          </Button>
          <Grid container>
        
         
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Login;