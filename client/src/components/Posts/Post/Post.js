import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
// import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';

import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './style';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile || 'https://www.pexels.com/photo/light-sea-dawn-landscape-6406717/'} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.title}</Typography>
        {/* <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography> */}
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="default" /></Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.source}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.category}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.solved}</Typography>
        <Typography variant="body2" color="textSecondary" component="p"><a href={post.link}>See Question</a></Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        
        <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>Delete</Button>
      </CardActions>
    </Card>
  );
};

export default Post;