import React,{useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useHistory } from "react-router-dom";
import axios from "axios";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{props.children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
    const history = useHistory();

    const [value, setValue] = useState(0);
    const [errorMsg, setErrorMsg] = useState()
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setErrorMsg()
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const sendPayload ={
        username: data.get('email'),
        password: data.get('password'),
    }
    console.log(sendPayload);
    //POST API
    axios.post('https://financepeer-be.herokuapp.com/login',sendPayload)
    .then((res)=>{
        console.log(res)
        history.push({
            pathname:'./welcome',
            state:{
                authToken:res.data
            }
            })
    })
    .catch((err)=>{
        console.log(err)
    })
  };
  const handleSubmitSignUp=(event)=>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload={
        username: data.get('email'),
        password: data.get('password'),
        confPassword:data.get('confPassword')
    }
    const sendPayload ={
        username: data.get('email'),
        password: data.get('password'),
    }
    const headers =  {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
    //POST API if passwords match
    if(payload.password===payload.confPassword){
        console.log(payload);
        axios.post('https://financepeer-be.herokuapp.com/login',sendPayload,{headers} )
        .then((res)=>{
            console.log(res)
            setErrorMsg()
        })
        .catch((err)=>{
            console.log(err)
        })
    }else{
        console.log("No match")
        setErrorMsg("Passwords do not Match")
    }
  }
  return (
    <Box sx={{ width: '100%',backgroundColor:"white",color:"black"}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="Login" {...a11yProps(0)} style={{width:"50%"}}/>
          <Tab label="Sign Up" {...a11yProps(1)} style={{width:"50%"}}/>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Typography className="enter">Good to see you</Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                    Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                            Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
            </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Box component="form" onSubmit={handleSubmitSignUp} noValidate sx={{ mt: 1 }}>
            <Typography className="enter">Welcome</Typography>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confPassword"
                        label="Confirm Password"
                        type="password"
                        id="conf-password"
                        autoComplete="current-password"
                        helperText={<span style={{color:"red"}}>{errorMsg}</span>}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                    Sign Up
                    </Button>
            </Box>
      </TabPanel>
    </Box>
  );
}