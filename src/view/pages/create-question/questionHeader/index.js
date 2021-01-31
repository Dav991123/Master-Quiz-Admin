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
import './index.css';


const QuestionHeader = ({quizTitle, setQuizTitle, quizDescription, setQuizDescription}) => {
    const [image, setImage] = useState(null);
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

    useEffect(() => {
        if(image !== null) {
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
                    .then((url) => {
                        console.log(url)
                    })
                }
            )

        }
    }, [image]);

    return (
        <div className="add_question_header">
            <form className={classes.root} noValidate autoComplete="off">
                <TextField 
                    placeholder="Quiz Title" 
                    defaultValue="Quiz Title"
                    value={quizTitle}
                    onChange={e => setQuizTitle(e.target.value)}
                />

                <TextField
                    id="outlined-multiline-static"
                    label="Form Description"
                    multiline
                    rows={1}
                    quizDescription={quizDescription}
                    variant="outlined"
                    onChange={e => setQuizDescription(e.target.value)}
                />


                <div className="upload_img_content">
                        <input 
                            type="file"
                            id={'fileInput'}
                            onChange={handleFileInputChange}
                        />
                    <label
                        for="fileInput"
                    >
                        <div>
                            <span>Upload Img</span>
                            <CloudUploadIcon />
                        </div>
                    </label>
                    
                </div>
            </form>
        </div>
    )
};

export default QuestionHeader;