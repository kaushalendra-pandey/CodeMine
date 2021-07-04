import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import swal from 'sweetalert2'
import { useHistory } from 'react-router';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {

  const history = useHistory()

  const [postData, setPostData] = useState({ title: '', source: '', link: '', solved: '',category:'' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({title: '', source: '', link: '', solved: '',category:''  });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {

      if(postData.title === "" || postData.solved === "" || postData.source === ""){
        swal.fire({
          title:"Please provide required details",
          icon:"error"
        })
        return
      }

      dispatch(createPost(postData))
      .then(data => {
        if(data.error === "Yes"){
          swal.fire({
            title:"Please Login",
            confirmButtonText:"Login",
            icon:"error",
          })
          .then((result) => {
            if(result.isConfirmed){
              history.push("/auth")
            }
          })
        } else {
          swal.fire({
            title:"Question Created successfuly",
            icon:"success"
          })
        }
      })
      .catch((e)=> {
        console.log(e)
      })
      
      clear();
    } else {
      if(postData.title === "" || postData.solved === "" || postData.source === ""){
        swal.fire({
          title:"Please provide required details",
          icon:"error"
        })
        return
      }
      dispatch(updatePost(currentId, postData))
      .then(data=>{
        if(data.error){
          swal.fire({
            title:"Cannot update",
            confirmButtonText:"Ok",
            icon:"error",
          })
        }
      })
      .catch((e)=>{
        console.log(e)
      })
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Add a Question'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="source" variant="outlined" label="Source" fullWidth value={postData.source} onChange={(e) => setPostData({ ...postData, source: e.target.value })} />
        <TextField name="category" variant="outlined" label="Category" fullWidth value={postData.category} onChange={(e) => setPostData({ ...postData, category: e.target.value })} />
        <TextField name="link" variant="outlined" label="Link" fullWidth multiline rows={4} value={postData.link} onChange={(e) => setPostData({ ...postData, link: e.target.value })} />
        <TextField name="solved" variant="outlined" label="Solved (YES or N0)" fullWidth value={postData.solved} onChange={(e) => setPostData({ ...postData, solved: e.target.value })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Add</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;