import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import CodeEditor from '../../components/codeEditor';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
// import { database } from '../../../../core/firebase/base';
import { database } from '../../../core/firebase/base';

import AddQuizConfig from './addQuizConfig';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
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
        '',
    ],
    correct_answer: []
};

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        width: '100%',
      },
    },
}));

const CreateQuestion = () => {
    const classes = useStyles();
    const [questions, setQuestions] = useState([{...addQuizDataModel}]);
    const [questionDataType, setQuestionDataType] = useState(questionType.code);

    const handleChangeAnswer = (quizIndex, optionIndex, e) => {
        const { value } = e.target;
        const answerList = [...questions[quizIndex].answerList];
        answerList[optionIndex] = value;
        const questionsModel = [...questions];
        questionsModel[quizIndex].answerList = answerList;
        setQuestions([...questionsModel])
    };

    const handlePushCorrectAnswer = (quizIndex, optionIndex) => {
        const questionsData = questions;
        questionsData[quizIndex].correct_answer = [optionIndex];
        setQuestions([...questionsData])      
    };


    const handleCodeEditorChange = (value, quizIndex) => {
        const quizData = [...questions];
        quizData[quizIndex].questionData = `${value}`;
        setQuestions([...quizData])
    };

    const handleSetImgSrc = (value, quizIndex) => {
        const quizData = [...questions];
        quizData[quizIndex].questionData = value;
        setQuestions([...quizData])
    };

    const handleSetText = (value, quizIndex) => {
        const quizData = [...questions];
        quizData[quizIndex].questionData = value;
        setQuestions([...quizData])
    };

    
    const handleChangeQuizDescription = (e, quizIndex) => {
        const { value } = e.target
        const quizData = [...questions];
        quizData[quizIndex].quizDescription = value;
        setQuestions([...quizData])
    }

    const handleSend = () => {
        console.log(questions);
        database.ref('/questions').child('JavaScript').set({
            ...questions
        })
    };
    

    // const createCourse = () => {
    //     const { coursesType, ...courseData } = values;
    //     database.ref(`/courses/${language}`).child(coursesType).set({
    //       ...courseData
    //     })
    //     .then(() => {
    //       setIsOpenModal(false);
    //       setLanguage(null)
    //     })
    //   };
    const questionDataModel = {
        [questionType.img]: (quizIndex) => (
            <TextField 
                id="standard-basic" 
                label="img src"
                onChange={e => handleSetImgSrc(e.target.value, quizIndex)}
            />
        ),
        [questionType.code]: (quizIndex) => (
            <div className="code_editor">
                <CodeEditor 
                    isOnChange={true}
                    fontSize={20}
                    questionCode={questions[quizIndex].questionData} 
                    onSetQuestionState={value => {
                        handleCodeEditorChange(value, quizIndex)
                    }}
                />
            </div>
        ),
        [questionType.text] : (quizIndex) => (
            <TextField 
                id="outlined-basic" 
                label="Text" 
                variant="outlined"
                multiline
                rows={2}
                onChange={e => handleSetText(e.target.value, quizIndex)}
            />
        )
    };

    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            {...addQuizDataModel}
        ])
    };

    return (
        <div className="create_question">
            <AddQuizConfig 
                handleSend={handleSend}
                handleAddQuestion={handleAddQuestion}
            />

            <div className="create_content">

                {
                    questions.map((quiz, quizIndex) => {
                        return (
                            <div className="create_quiz_content">

                                <span className="section_number_info">
                                   Section {quizIndex + 1}
                                </span>
                                <div className="top_content">
                                </div>
                                <form className={classes.root} noValidate autoComplete="off" >
                               
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

                                    
                                    <div className="question_data">
                                        { questionDataModel[questionDataType](quizIndex) }
                                    </div>

                               </div>


                                <div>
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Quiz Description"
                                        multiline
                                        rows={3}
                                        variant="outlined"
                                        onChange={e => handleChangeQuizDescription(e, quizIndex)}
                                    />
                                </div>


                                <div className="untitled_question_content">
                                    <div className="x">
                                    <h3>Untitled Question</h3>
                                    </div>
                                    
                                    {
                                        quiz.answerList.map((item, optionIndex) => {
                                          return (
                                            <div className="option_list">
                                                <div>

                                                    <div className="correct_answer_button_content">
                                                        <Button 
                                                            onClick={() => {
                                                                handlePushCorrectAnswer(quizIndex, optionIndex)
                                                            }}
                                                            variant={questions[quizIndex].correct_answer.includes(optionIndex) ? 'contained' : 'outlined'} 
                                                            color={`primary`} 
                                                            size="small"
                                                        >
                                                        {optionIndex + 1}
                                                        </Button>
                                                    </div>
                                        
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
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default CreateQuestion;