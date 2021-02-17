import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { purple } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { database } from '../../../../core/firebase/base';
import { useHistory } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import { ROUTE_CONSTANTS } from '../../../../core/constants/routeConstants';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  descriptionContent: {
    height: 100,
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
    backgroundColor: purple[400],
  },
}));

const CardQuiz = ({id, title, number, creationDate, imgUrl, description}) => {
  const classes = useStyles();
  const history = useHistory();
  const handleDeleteQuiz = () => database.ref(`/questions/${id}`).remove();

  const handleEditQuiz = () => history.push(`${ROUTE_CONSTANTS.EDIT_QUESTION}/${id}`);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {number}
          </Avatar>
        }
        action={
          <IconButton
            aria-label="show more"
            onClick={handleEditQuiz}
            className={clsx(classes.expand)}
          >
            <EditIcon />
          </IconButton>
        }
        title={title}
        subheader={creationDate}
      />
      <CardMedia
        className={classes.media}
        image={imgUrl}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" className={classes.descriptionContent}>
          {description}
        </Typography>
      </CardContent>
      
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand)}
          onClick={handleDeleteQuiz}
          aria-label="show more"
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
     
    </Card>
  );
}

export default CardQuiz