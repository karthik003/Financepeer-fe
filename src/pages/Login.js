import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TabPanel from '../components/Tabpanel'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
      height: 200,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    },
  }));
function Login() {
    const classes = useStyles();

    return (
        <div style={{height:"100vh"}}>
            <Box sx={{ flexGrow: 1 }} >
                <Grid container >
                        <Grid item xs={4}>
                        </Grid>
                        
                        <Grid item xs={4} style={{marginTop:"100px"}}>
                            <TabPanel/>
                        </Grid>

                        <Grid item xs={4}>
                        </Grid>
                </Grid>
                </Box>
        </div>
    )
}

export default Login
