import React, { useState, useRef, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { storage } from '../../../../core/firebase/base';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ImgModal from './imgModal';
import './index.scss';

const QuestionHeader = ({setQuizDataInfo, quizDataInfo}) => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
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

    const handleOpenModal = () => {
        setOpenModal(true);
    }
    
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
        <>
         <ImgModal 
            openModal={openModal}
            quizDataInfo={quizDataInfo}
            setOpenModal={setOpenModal}
         />
        <div className="question_header">
            <form className={classes.root} noValidate autoComplete="off">
                <TextField 
                    rows={1}
                    id="outlined-multiline-static"
                    placeholder="Quiz Title" 
                    multiline
                    variant="outlined"h
                    value={quizDataInfo.title}
                    onChange={handleChangeTitle}
                />

                <TextField
                    id="outlined-multiline-static"
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


                    <div>
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
  
                    {
                        quizDataInfo.imgUrl && (
                            <div>
                                <Button 
                                    variant="contained"
                                    onClick={handleOpenModal}
                                >
                                    Show image 
                                </Button>
                            </div>
                        )
                    }
                    </div>
                </div>    
            </form>
        </div>
        </>
    )
};

export default QuestionHeader;