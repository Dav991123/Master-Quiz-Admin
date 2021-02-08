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
import IconButton from '@material-ui/core/IconButton';
import CopyrightIcon from '@material-ui/icons/Copyright';
import Tooltip from '@material-ui/core/Tooltip';
import QuestionHeader from './questionHeader/';
import { database, rootQuestions } from '../../../core/firebase/base';
import DeleteIcon from '@material-ui/icons/Delete';
import { useStickyState } from '../../..//hooks/useStickyState';
import AddQuizConfig from './addQuizConfig';
import QuizOptionConfig from './quizOptionConfig';
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
    correct_answer: [0]
};

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        width: '100%',
      },
    },
}));

const CreateQuestion = () => {
    const dt = new Date();
    const classes = useStyles();
    const [questions, setQuestions] = useStickyState([{...addQuizDataModel}], 'questionsList');
    const [optionType, setOptionType] = useState(1);
    const [questionDataType, setQuestionDataType] = useState(questionType.code);
    const [quizDataInfo, setQuizDataInfo] = useStickyState({
        imgUrl: '',
        description: '',
        title: '',
        dt: `${dt.getFullYear()}/${(dt.getMonth() + 1)}/${dt.getDate()}`,
    }, 'quizDataInfo')
    
    const handleChangeAnswer = (quizIndex, optionIndex, e) => {
        const { value } = e.target;
        const answerList = [...questions[quizIndex].answerList];
        answerList[optionIndex] = value;
        const questionsModel = [...questions];
        questionsModel[quizIndex].answerList = answerList;
        setQuestions([...questionsModel])
    };

    const handlePushCorrectAnswer = (quizIndex, optionArrayIndex) => {
        const questionsData = questions;
        questionsData[quizIndex].correct_answer = [...optionArrayIndex];
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

    const handleDeleteQuiz = quizIndex => {
        const questionsData = [...questions];
        if(questionsData .length > 1) {
            questionsData.splice(quizIndex, 1);
            setQuestions([...questionsData])
        };
    };

    const handleCopy = quizIndex => {
        const questionsData = [...questions];
        questionsData.splice(quizIndex, 0, questionsData[quizIndex]);
        setQuestions([...questionsData])
    };

    const handleSend = () => {
        const autoId = rootQuestions.push().key;
        database.ref('/questions').child(autoId).set({
            ...quizDataInfo,
            questionsList: questions
        })
        .then(resp => {
            console.log(resp, 'resp')
        });
    };
    
    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            {...addQuizDataModel}
        ])
    };

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

    console.log(questions, 'questions');

    return (
        <div className="create_question">
            <QuestionHeader
                quizDataInfo={quizDataInfo}
                setQuizDataInfo={setQuizDataInfo}
            />
            <div className="create_content">

                {
                    questions.map((quiz, quizIndex) => {
                        return (
                            <div className="create_quiz_content">

                                <span className="section_number_info">
                                   Section {quizIndex + 1}
                                </span>

                                <span className="remove_quiz_content">
                                    <Tooltip title="Duplicate" onClick={() => handleCopy(quizIndex)}>
                                        <IconButton aria-label="copy">
                                            <CopyrightIcon />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Delete" onClick={() => handleDeleteQuiz(quizIndex)}>
                                        <IconButton aria-label="delete" disabled={questions.length === 1}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
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
                                        rows={2}
                                        variant="outlined"
                                        value={quiz.quizDescription}
                                        onChange={e => handleChangeQuizDescription(e, quizIndex)}
                                    />
                                </div>

                                <div className="untitled_question_content">
                                    <QuizOptionConfig 
                                        optionType={optionType}
                                        setOptionType={setOptionType}
                                        options={quiz.answerList}
                                        quizIndex={quizIndex}
                                        handlePushCorrectAnswer={handlePushCorrectAnswer}
                                        correctAnswer={questions[quizIndex].correct_answer}
                                    />
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
                            </div>
                        )
                    })
                }
            </div>

            <AddQuizConfig 
                handleSend={handleSend}
                handleAddQuestion={handleAddQuestion}
            />
        </div>
    )
};

export default CreateQuestion;