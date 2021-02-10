import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";


const AddQuiz = () => {
    let history = useHistory();

    const handleCreateNewQuiz = () => {
        history.push("/create-question");
        localStorage.removeItem('questionsList');
        localStorage.removeItem('quizDataInfo')
    };

    return (
        <div className="add_quiz_content">
            <IconButton
                onClick={handleCreateNewQuiz}
                aria-label="show more"
            >
                <AddIcon
                    style={{ fontSize: 150 }} 
                />
            </IconButton>
        </div>   
    )
};

export default AddQuiz;