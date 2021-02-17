import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import AddQuiz from './addQuiz';
import Grid from '@material-ui/core/Grid';
import { database } from '../../../core/firebase/base';
import Tooltip from '@material-ui/core/Tooltip';
import classNames from 'classnames';
import CardQuiz from './cardQuiz';
import './index.scss';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Courses = () => {
  const [quizData, setQuizData] = useState([]);
  const [isLoading, setIsLoading] = useState({
    getQuiz: false
  });
  
  useEffect(() => {
    setIsLoading({
      ...isLoading,
      getQuiz: true
    });

    database.ref('/questions').on('value', e => {
      const data = Object.values(e.val()) 
      console.log(data, 'data')
      setQuizData(data);
      setIsLoading({
        ...isLoading,
        getQuiz: false
      })
    });

  }, []);

  
  return (
    <div className="quiz_list_content">
      <div className="content content__list_grid">
            <div>
              <AddQuiz />
            </div>
            {
              quizData.map((item, index) => {
                return (
                  <div>
                    <CardQuiz 
                      id={item.id}
                      title={item.title}
                      number={index + 1}
                      imgUrl={item.imgUrl}
                      creationDate={item.dt}
                      description={item.description}
                    />
                  </div>
                )  
              })
            }
      </div>
    </div>
  )
}
export default Courses;
