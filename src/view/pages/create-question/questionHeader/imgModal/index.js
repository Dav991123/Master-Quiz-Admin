import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './index.css';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ImgModal = ({openModal, setOpenModal, quizDataInfo: {imgUrl}}) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const handleClose = () => {
    setOpenModal(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
        <div className="upload_img_content">
            <img src={imgUrl} />
        </div>
    </div>
  );

  return (
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
  );
}

export default ImgModal;