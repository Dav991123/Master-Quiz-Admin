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
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddQuiz from './addQuiz';
import Grid from '@material-ui/core/Grid';
import { database } from '../../../core/firebase/base';
import classNames from 'classnames';



import './index.css';


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
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [quizData, setQuizData] = useState([]);
  const [isLoading, setIsLoading] = useState({
    getQuiz: false
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  useEffect(() => {
    setIsLoading({
      ...isLoading,
      getQuiz: true
    });

    database.ref('/questions').on('value', e => {
      const data = Object.values(e.val()) 
      setQuizData(data);
      setIsLoading({
        ...isLoading,
        getQuiz: false
      })
    });

  }, []);

  return (
    <div className="quiz_list_content ">
      <div className="content list">
      <Grid container alignItems="center" spacing={2}>
          <Grid item >
            <AddQuiz />
          </Grid>

          {
            quizData.map((item, index) => {
              return (
                <Grid item >
                <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {index + 1}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={item.title}
                    subheader={item.dt}
                  />
                  <CardMedia
                    className={classes.media}
                    image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png"
                    title="Paella dish"
                  />

                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      
                      <IconButton
                        className={clsx(classes.expand, {
                          [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </CardActions>
                </Card>
                </Grid>
              )
            })
          }

      </Grid>
      </div>
    </div>
  )
}
export default Courses;
