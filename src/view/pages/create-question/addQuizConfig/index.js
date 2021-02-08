import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SendIcon from '@material-ui/icons/Send';
import './index.css';

const AddQuizConfig = ({ handleAddQuestion, handleSend }) => {
    return (
        <div className="add_quiz_config">
            <div>
{/*             
                <div>
                    <Tooltip 
                        title="Send"
                        placement="left"
                    >
                        <IconButton 
                            aria-label="show more"
                            onClick={handleSend}
                        >
                            <SendIcon
                                style={{ fontSize: 20, color: 'green' }} 
                            />
                        </IconButton>
                    </Tooltip>
                </div> */}


                <div>
                    <Tooltip 
                        title="Add Question"
                        placement="top"
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
        </div>
    )
};

export default AddQuizConfig;
