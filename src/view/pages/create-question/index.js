import React, { useMemo } from 'react';
import SaveButton from '../../components/shared/saveButton';
import QuestionHeader from '../../components/shared/questionHeader';
import { database, rootQuestions } from '../../../core/firebase/base';
import { useStickyState } from '../../..//hooks/useStickyState';
import { useHistory } from 'react-router-dom';
import AddQuizConfig from '../../components/shared/addQuizConfig';
import { ROUTE_CONSTANTS } from '../../../core/constants/routeConstants';
import QuizListItem from '../../components/shared/quizListItem';
import { addQuizDataModel } from '../../../core/constants/quizConstant';
import './index.scss';

const CreateQuestion = () => {
    const dt = new Date();
    const [questions, setQuestions] = useStickyState([{...addQuizDataModel}], 'questionsList');
    const history = useHistory()
    const [quizDataInfo, setQuizDataInfo] = useStickyState({
        imgUrl: '',
        description: '',
        title: '',
        dt: `${dt.getFullYear()}/${(dt.getMonth() + 1)}/${dt.getDate()} : ${dt.toLocaleTimeString()}`,
    }, 'quizDataInfo')

    const handleSave = () => {
        const autoId = rootQuestions.push().key;
        database.ref('/questions').child(autoId).set({
            ...quizDataInfo,
            id: autoId,
            questionsList: questions
        })
        .then(resp => {
            console.log(resp, 'resp');
            history.push(ROUTE_CONSTANTS.QUESTIONS)
        });
    };
    
    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            {...addQuizDataModel, id: questions.length + 1}
        ])
    };

    const saveButtonValidation = useMemo(() => {
        let isValid = true;

        if(quizDataInfo.title && quizDataInfo.description) { // && quizDataInfo.imgUrl
            isValid = false
        }
        
        return isValid;
    }, [quizDataInfo]);

    return (
        <div className="create_question">
            <QuestionHeader
                quizDataInfo={quizDataInfo}
                setQuizDataInfo={setQuizDataInfo}
            />

            <SaveButton 
                handleSave={handleSave}
                validation={saveButtonValidation}
            />

            <QuizListItem 
                questions={questions}
                setQuestions={setQuestions}
            />

            <AddQuizConfig 
                handleAddQuestion={handleAddQuestion}
            />
        </div>
    )
};

export default CreateQuestion;