import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import './index.css';

const AddQuizConfig = ({handleAddQuestion}) => {
    return (
        <div className="add_quiz_config">
            <div>
            <Tooltip 
                title="Add Question"
                placement="left"
            >
                <IconButton 
                    aria-label="show more"
                    onClick={handleAddQuestion}
                >
                    <AddIcon
                        style={{ fontSize: 20 }} 
                    />
                </IconButton>
            </Tooltip>
            </div>
        </div>
    )
};

export default AddQuizConfig;
