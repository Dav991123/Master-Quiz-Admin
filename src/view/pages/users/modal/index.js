import React, { useEffect, useState, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { database, rootQuestions } from '../../../../core/firebase/base';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { highlight, languages } from 'prismjs/components/prism-core';
import CodeEditor from '../../../components/codeEditor';
import Editor from 'react-simple-code-editor';
import './index.scss';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: '100%',
    maxHeight: '80vh',
    overflow: 'auto',
    maxWidth: '1000px',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const styleEditor = {
  fontFamily: '"Fira code", "Fira Mono", monospace',
  fontSize: 20
}

const UserQuizInfoModal = ({modalData, onSetModalData}) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [quizList, setQuizList] = useState([]);
    const handleClose = () => {
        onSetModalData(prev => ({
            answers: [],
            id: ''
        }))
    };

    useEffect(() => {
        setLoading(true);
        rootQuestions.once('value')
        .then(snapshot => {
            const {questionsList, ...quizDataInfo} = snapshot.child(modalData.id).val();
            setQuizList(questionsList);
            setLoading(false);
        })
    }, [modalData]);


    console.log(quizList, 'quizList');
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalData.id}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={quizList.length}>
            
           
          <div className={classes.paper}>
                {
                    quizList.map((item, index) => (
                        <Paper elevation={2} style={{height: '300px'}}>
                            {item.questionData}

                            <div className={'editor-content'}>
                              <CodeEditor 
                                  isOnChange={true}
                                  fontSize={20}
                                  questionCode={item.questionData} 
                                  onSetQuestionState={value => {
                                      // handleCodeEditorChange(value, quizIndex)
                                  }}
                              />
                            </div>
                        </Paper>
                    ))
                        
                }
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default memo(UserQuizInfoModal)