import React,{useState} from 'react'
import {Avatar,Button,Typography,Grid,Paper,Conatiner, Container, TextField} from '@material-ui/core'
import {GoogleLogin} from 'react-google-login'
import useStyles from './styles'
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Input from './Input'
import Icon from './Icon'
import {useDispatch} from "react-redux"
import {useHistory} from 'react-router-dom'
import {signin,signup} from '../../actions/auth'
const initialData = {firstName:'',lastName:'',email:'',password:'',confirmPassword:''}

const Auth = () => {
    const classes = useStyles()
    const [showPassword,setShowPassword] = useState(false)
    const [formData,setFormData] = useState(initialData)
    const [isSignup,setIsSignup] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()    
    const handleShowPassword = ()=>{
        setShowPassword((prev)=>!prev)
    }

    

    const handleSubmit = (e) =>{
        console.log("clicked");
       e.preventDefault()
       if(isSignup){
        dispatch(signup(formData,history))
       }else{
        dispatch(signin(formData,history))
       }

    }

    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const switchMode = () =>{
        setIsSignup((prev)=>!prev)
    }

    

    const googleSuccess = async (res) =>{
        const result = res?.profileObj
        const token = res?.tokenId
        try {
            dispatch({type:"AUTH",data:{result,token}})
            history.push('/')
        } catch (error) {
            console.log(error)
            
        }
    }

    const googleFailure = () =>{
        console.log("Login Unsuccesful");
    }

    return (
       <Container compnent="main" maxwidth="xs">
           <Paper className={classes.paper} elevation={3}>
               <Avatar className = {classes.avatar}>
                   <LockOutlinedIcon/>
               </Avatar>
               <Typography variant="h5">{isSignup?'Sign Up':'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid conntainer spacing={2}>
                        {
                            isSignup &&(
                                <>  
                                    <Input name="firstName" label="First Name" handleChane={handleChange}
                                    autoFocus half/>
                                    <Input name="lastName" label="Last Name" handleChane={handleChange}
                                    autoFocus half/>

                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="password" handleChange={handleChange} type={showPassword?'text':'password'} handleShowPassword={handleShowPassword}/>
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                    </Grid>

                     <GoogleLogin
                        clientId = "455526421033-bo503k8dha7ots7mnil04sp5tmg9v25n.apps.googleusercontent.com"
                        render={(renderProps)=>(
                            <Button
                            className={classes.googleButton}
                            color="primary"
                            fillWidth
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            startIcon={<Icon/>}
                            variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"  
                        />   

                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}> 
                        {isSignup?"Sign Up":"Sign In"}
                    </Button>
                     <Grid container justify="flex-end">
                         <Grid item>
                             <Button onClick={switchMode}>
                                {isSignup?"Alredy have an account":"Dont have an account? Sign Up"}
                             </Button>
                         </Grid>
                    </Grid>    
                </form>
           </Paper>
       </Container>
    )
}

export default Auth
