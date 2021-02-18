import React, { useEffect, useState, useMemo } from 'react';
import { rootQuestions, database } from '../../../core/firebase/base';
import { withRouter } from 'react-router-dom';
import { useStickyState } from '../../../hooks/useStickyState';
import QuestionHeader from '../../components/shared/questionHeader';
import SaveButton from '../../components/shared/saveButton';
import QuizListItem from '../../components/shared/quizListItem';
import AddQuizConfig from '../../components/shared/addQuizConfig';
import { addQuizDataModel } from '../../../core/constants/quizConstant';
import { useSnackbar } from 'notistack';


const EditQuestion = (props) => {
    const quizId = props.match.params.quizId;
    const { enqueueSnackbar } = useSnackbar();
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
  
    const handleClickVariant = (variant) => () => {
        console.log('vbhjbjh')
        enqueueSnackbar('This is a success message!', { variant });
    };
    
    const handleSave = () => {
        database.ref(`/questions/${quizId}`).update({
            ...quizDataInfo,
            id: quizId,
            questionsList: questions
        }).then(() => {
            
        })
    }

    const saveButtonValidation = useMemo(() => {
        let isValid = true;

        if(quizDataInfo.title && quizDataInfo.description) { // && quizDataInfo.imgUrl
            isValid = false
        }
        
        return isValid;
    }, [quizDataInfo]);

    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            {...addQuizDataModel}
        ])
    };
    
    return (
        <div className="create_question">
            <button onClick={() => handleClickVariant('success')}>
                onClick
            </button>

            
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