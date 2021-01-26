import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import CodeEditor from '../../components/codeEditor';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import './index.css';

import './index.css';

const questionType  = {
    img: '1',
    code: '2',
    text: '3'
};

const addQuizDataModel = {
    quizDescription: '',
    questionData: ``,
    questionType: questionType.code,
    answerList: [
        '',
        '',
        '',
        ''
    ],
    correct_answer: ''
};

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '100%',
      },
    },
}));

const CreateQuestion = () => {
    const classes = useStyles();
    const [questions, setQuestions] = useState([addQuizDataModel]);
    const [questionDataType, setQuestionDataType] = useState(questionType.code);

    const questionDataModel = {
        [questionType.img]: () => (
            <TextField 
                id="standard-basic" 
                label="img src"
            />
        ),
        [questionType.code]: (quizIndex) => (
            <CodeEditor 
                isOnChange={true}
                fontSize={20}
                questionCode={questions[quizIndex].questionData} 
                onSetQuestionState={value => {
                    
                }}
            />
        ),
        [questionType.text] : () => (
            <TextField 
                id="outlined-basic" 
                label="Text" 
                variant="outlined"
                multiline
                rows={2}
            />
        )
    };

    
    const handleChangeAnswer = (quizIndex, optionIndex, e) => {
        const { value } = e.target;
        console.log(value, 'value');

        const data = questions[quizIndex].answerList;
      
        data[optionIndex] = value;

        console.log(data, 'data')
       setQuestions(prevData => {
           
       })
    };


    return (
        <div className="create_question">
            <div className="create_content">
                {
                    questions.map((quiz, quizIndex) => {
                        return (
                            <form className={classes.root} noValidate autoComplete="off">
                               
                               <div className="question_data_type_content">
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Question Data Type</FormLabel>
                                            <RadioGroup row aria-label="position" name="position" defaultValue={questionDataType} onChange={(e) => {
                                                setQuestionDataType(e.target.value)
                                            }}>
                                                <FormControlLabel
                                                    value={questionType.img}
                                                    control={<Radio color="primary" />}
                                                    label="Img"
                                                />

                                                <FormControlLabel
                                                    value={questionType.text}
                                                    control={<Radio color="primary" />}
                                                    label="Text"
                                                />

                                                <FormControlLabel
                                                    value={questionType.code}
                                                    control={<Radio color="primary" />}
                                                    label="Code"
                                                />

                                            </RadioGroup>
                                    </FormControl>
                               </div>

                                <div className="question_data">
                                    { questionDataModel[questionDataType](quizIndex) }
                                </div>


                                <div>
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Quiz Description"
                                        multiline
                                        rows={3}
                                        defaultValue="Default Value"
                                        variant="outlined"
                                    />
                                </div>


                                <div className="untitled_question_content">
                                    <h3>Untitled Question</h3>
                                    
                                    {
                                        quiz.answerList.map((item, optionIndex) => {
                                          return (
                                            <div className="option_list">
                                                <div>
                                                    <TextField 
                                                        id="standard-basic" 
                                                        label={`Option ${optionIndex + 1}`}
                                                        value={quiz.answerList[optionIndex]}
                                                        onChange={e => handleChangeAnswer(quizIndex, optionIndex, e)}
                                                    />
                                                </div>
                                            </div>
                                          )  
                                        })
                                    }
                                    
                                </div>
                            </form>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default CreateQuestion;