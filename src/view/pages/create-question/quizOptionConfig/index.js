import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import { optionTypes } from '../../../../core/constants/enums';
import { enumConverter } from '../../../../core/helpers/enumConverter';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './index.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const QuizOptionConfig = ({options, quizIndex, optionType, setOptionType, correctAnswer, handlePushCorrectAnswer}) => {
    const [correctAnswers, setCorrectAnswers] = useState(correctAnswer);
    const theme = useTheme();

    const handleChangeMultiple = (event) => {
        setCorrectAnswers(event.target.value);
        if(optionType == 1) {
            handlePushCorrectAnswer(quizIndex, [0]);
            setCorrectAnswers([0]);
        }
    };


    useEffect(() => {
        handlePushCorrectAnswer(quizIndex, [...correctAnswers])
    }, [correctAnswers]);
  
    const answerDropDown = {
        1: () => (
            <>
             <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Select Option</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={correctAnswer[0]}
                        onChange={(value) => handlePushCorrectAnswer(quizIndex, [value.target.value])}
                    >
                        {
                            options.map((_, index) => {
                                return (
                                    <MenuItem value={index}>Option {index + 1}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </>
        ),

        2: () => (
            <>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-name-label">Select Options</InputLabel>
                        <Select
                            labelId="demo-mutiple-name-label"
                            id="demo-mutiple-name"
                            multiple
                            value={correctAnswers}
                            onChange={handleChangeMultiple}
                            input={<Input />}
                            MenuProps={MenuProps}
                        >
                            {options.map((_, index) => (
                                <MenuItem key={index} value={index} style={getStyles(index, correctAnswers, theme)}>
                                    Option {index + 1}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
            </>
        ),
        3 : () => null
    }

    const classes = useStyles();

    return (
        <div className="quiz_option_config_content">

            <h3>Untitled Question</h3>

            <div>
                {answerDropDown[optionType]()}

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Option Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={optionType}
                        onChange={e => setOptionType(e.target.value)}
                    >
                        {
                            enumConverter(optionTypes).map((item) => {
                                return (
                                    <MenuItem value={item.value}>{item.label}</MenuItem>
                                )
                            })
                        }                  
                    </Select>
                </FormControl>
            </div>

            
        </div>
    )
};

export default QuizOptionConfig;