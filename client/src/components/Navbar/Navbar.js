import React from 'react'
import {AppBar, Avatar, Typography,Button,Toolbar} from '@material-ui/core';
import memories from '../../images/ninja-coder.png';
import useStyles from './style'
import {Link} from 'react-router-dom'
import {useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory,useLocation} from 'react-router-dom'

const Navbar = () => {
    const classes = useStyles()
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    useEffect(()=>{
      const token = user?.token;
      setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])

    const logout = () =>{
        dispatch({type:"LOGOUT"})
        history.push('/')
        setUser(null)
      }
    return (
       <AppBar className={classes.appBar} position="static" color="inherit">

        <div className={classes.brandContainer}>
          <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">CodeMine</Typography>
          <img className={classes.image} src={memories} alt="icon" height="60" />
        </div>
        <Toolbar className={classes.toolbar}>
          {user ? (
            <div className={classes.profile}>
              <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography className = {classes.userName} variant="h6">{user.result.name}</Typography>
              <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}> Logout </Button>
            </div>
          ):(
            <Button component={Link} to='/auth' variant="contained" color="primary">Sign In</Button>
          )}

        </Toolbar>
      </AppBar>

    )
}

export default Navbar
