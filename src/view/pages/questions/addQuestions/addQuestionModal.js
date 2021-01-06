import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Editor from 'react-simple-code-editor';
import { useForm } from '../../../../hooks/useForm';
import { database } from '../../../../core/firebase/base';
import { highlight, languages } from 'prismjs/components/prism-core';

import {
  Modal, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  Input, 
  MenuItem,
  Button,
} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  margin: {
    margin: theme.spacing(1),
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: 444,
  },
  input: {
    width: '100%',
    marginTop: '20px'
  },
  button: {
    marginTop: '30px',
    margin: 'auto',
    display: 'flex',
  }
}));



const AddCourse = ({isOpenModal, setIsOpenModal}) => {
  
  const { values, errors, onFocus, isEnable, handleChange, handleOutsideClick } = useForm(
    {
      coursesType: '',
      courseTitle: '',
      courseLogoUrl: '',
      courseDescription: '',
    },
    {
    }
  )
  const [codeValue, setCodeValue] = useState('njnjkn')

  const [language, setLanguage] = useState(null);
  const classes = useStyles();

    

  const styleEditor = {
    fontFamily: '"Fira code", "Fira Mono", monospace',
    fontSize: 20
}

  const handleClose = () => {
    setIsOpenModal(false);
  };
  
  function getStyles(name, theme) {
    return {
      fontWeight:
      values.coursesType.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const handleChangeLanguage = (value) => {
    setLanguage(value)
  }

  const createCourse = () => {
    const { coursesType, ...courseData } = values;
    database.ref(`/courses/${language}`).child(coursesType).set({
      ...courseData
    })
    .then(() => {
      setIsOpenModal(false);
      setLanguage(null)
    })
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpenModal} 
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >

        <Fade in={isOpenModal}>  
          <div className={classes.paper}>
              <form className={classes.input} noValidate autoComplete="off">
                <div>
                {/* <FormControl className={classes.input} >
                   <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
                    <Select
                      labelId="demo-mutiple-name-label"
                      id="demo-mutiple-name"
                      value={values.coursesType}
                      onChange={handleChange}
                      name="coursesType"
                      input={<Input />}
                    >
                      {coursesType.map((name) => (
                        <MenuItem 
                          key={name} 
                          value={name} 
                          style={getStyles(name, theme)}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}
                {/* question */}
                <TextField 
                    className={classes.input} 
                    id="outlined-basic" 
                    label="Question" 
                    variant="outlined" 
                    onChange={handleChange}
                    name="courseTitle"
                  /> 
                  <TextField 
                    className={classes.input} 
                    id="outlined-basic" 
                    label="answer A" 
                    variant="outlined" 
                    onChange={handleChange}
                    name="courseTitle"
                    size="small"
                  /> 

                  <TextField 
                    className={classes.input} 
                    id="outlined-basic" 
                    label="answer B"
                    variant="outlined" 
                    onChange={handleChange}
                    name="courseLogoUrl"
                    size="small"
                  /> 

                  <TextField 
                    className={classes.input} 
                    id="outlined-basic" 
                    label="answer C"
                    variant="outlined" 
                    onChange={handleChange}
                    name="courseTitle"
                    size="small"
                  /> 

                  <TextField 
                    className={classes.input} 
                    id="outlined-basic" 
                    label="answer D"
                    variant="outlined" 
                    onChange={handleChange}
                    name="courseTitle"
                    size="small"
                  />

            
              <div className={'editor-content'}>
                    <Editor
                        value={codeValue}
                        onValueChange={code => setCodeValue(code)}
                        highlight={code => highlight(code, languages.js)}
                        padding={10}
                        style={styleEditor}
                    />
                </div>

                
                  <Button   
                    className={classes.button}  
                    variant="contained" 
                    color="primary" 
                    disableElevation
                    onClick={createCourse}
                    disabled={!language}
                  >
                    Create Course
                  </Button>
                </div>   
              </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
export default AddCourse;