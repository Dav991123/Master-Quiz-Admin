import React, { useEffect, useState } from 'react';
import { rootQuestions } from '../../../core/firebase/base';
import { withRouter } from 'react-router-dom';
import { useStickyState } from '../../../hooks/useStickyState';
import QuestionHeader from '../../components/shared/questionHeader';
import SaveButton from '../../components/shared/saveButton';
import QuizListItem from '../../components/shared/quizListItem';
import AddQuizConfig from '../../components/shared/addQuizConfig';
import { addQuizDataModel } from '../../../core/constants/quizConstant';

const EditQuestion = (props) => {
    const quizId = props.match.params.quizId;
    const [questions, setQuestions] = useStickyState([{...addQuizDataModel}], 'questionsList');
    const [loading, setLoading] = useState(false);
    const [quizDataInfo, setQuizDataInfo] = useState({}, 'quizDataInfo');
    useEffect(() => {
        setLoading(true);
        rootQuestions.once('value')
        .then(snapshot => {
            const {questionsList, ...quizDataInfo} = snapshot.child(quizId).val();
            setLoading(false);
            setQuestions(questionsList);
            setQuizDataInfo(quizDataInfo);
        })
    }, [quizId]);
  
    const handleSave = () => {

    }

    const saveButtonValidation = () => {

    }

    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            {...addQuizDataModel}
        ])
    };
    
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
export default withRouter(EditQuestion);