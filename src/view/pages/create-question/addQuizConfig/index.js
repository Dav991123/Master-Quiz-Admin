import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SendIcon from '@material-ui/icons/Send';
import './index.css';

const AddQuizConfig = ({ handleAddQuestion }) => {

    const handleAddButtonClick = () => {
        handleAddQuestion();
        setTimeout(() => {
            const elem = document.getElementById('add_button_content');
            elem && elem.scrollIntoView({
              behavior: 'smooth',
        });}, 0);
    };
    
    return (
        <div className="add_quiz_config">
            <div>
                <div id="add_button_content">
                    <Tooltip 
                        title="Add Question"
                        placement="top"
                    >
                        <IconButton 
                            aria-label="show more"
                            onClick={handleAddButtonClick}
                        >
                            <AddIcon
                                style={{ fontSize: 20 }} 
                            />
                        </IconButton>
                </Tooltip>
                </div>
            </div>
        </div>
    )
};

export default AddQuizConfig;
