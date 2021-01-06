import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddCourse from './addQuestionModal'

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

const AddCourses = () => {
  const classes = useStyles();
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleAddCourses = () => {
    setIsOpenModal(true)
  };

  return (
    <div>
      <Tooltip 
        title="Add Courses" 
        aria-label="add"
        onClick={handleAddCourses}
        >
        <Fab color="primary" className={classes.fab}>
          <AddIcon />
        </Fab>
      </Tooltip>

      <AddCourse 
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
    </div>
  );
}

export default AddCourses;