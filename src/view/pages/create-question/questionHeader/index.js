import React, { useState, useRef, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { storage } from '../../../../core/firebase/base';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import LoopIcon from '@material-ui/icons/Loop';
import './index.css';

const QuestionHeader = ({setQuizDataInfo, quizDataInfo}) => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const useStyles = makeStyles((theme) => ({
        root: {
          '& .MuiTextField-root': {
            width: '100%',
            marginTop: '10px'
          },
        },
    }));
    const classes = useStyles();

    const handleFileInputChange = e => {
        if(e.target.files[0]) {
            setImage(e.target.files[0])
        }
    };

    const handleChangeTitle = e => {
        const { value } = e.target;
        setQuizDataInfo(prev => ({
            ...prev,
            title: value,
        }));
    };

    const handleChangeDescription = e => {
        const { value } = e.target;
        setQuizDataInfo(prev => ({
            ...prev,
            description: value,
        }));
    };

    const handleSetImgUrl = imgUrl => {
        setLoading(false);
        setQuizDataInfo(prev => ({
            ...prev,
            imgUrl
        }));
    };

    useEffect(() => {
        if(image !== null) {
            setLoading(true);
            const uploadImg = storage.ref(`images/${image.name}`).put(image);
            uploadImg.on(
                'state_changed',
                snapshot => {},
                error => {
                    console.log('error')
                },
                () => {
                    storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(handleSetImgUrl)
                }
            )

        }
    }, [image]);

    return (
        <div className="add_question_header">
            <form className={classes.root} noValidate autoComplete="off">
                <TextField 
                    rows={1}
                    id="outlined-multiline-static"
                    placeholder="Quiz Title" 
                    multiline
                    variant="outlined"
                    value={quizDataInfo.title}
                    onChange={handleChangeTitle}
                />

                <TextField
                    id="outlined-multiline-static"
                    label="Form Description"
                    multiline
                    rows={1}
                    variant="outlined"
                    value={quizDataInfo.description}
                    onChange={handleChangeDescription}
                />


             <div className="upload_img_avatar_content">
                <div className="upload_img_content">
                            <input 
                                type="file"
                                id={'fileInput'}
                                onChange={handleFileInputChange}
                            />

                    
                        <label for="fileInput">
                            {
                                loading ? (
                                    <div>
                                        loading...
                                    </div>
                                ): (
                                    <div>
                                        <span>Upload Img</span>
                                        <CloudUploadIcon />
                                    </div>
                                )
                            }
                        </label>
                    </div>
                </div>    
            </form>
        </div>
    )
};

export default QuestionHeader;