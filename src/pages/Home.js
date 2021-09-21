import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import UploadPanel from '../components/UploadPanel'
import { useLocation } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
      height: 200,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    },
  }));
function Home() {
    const classes = useStyles();
    const location = useLocation();
    console.log("state",location.state)
    return (
        <div style={{height:"100vh"}}>
            <Box sx={{ flexGrow: 1 }} >
                <Grid container >
                        <Grid item xs={4}>
                        </Grid>
                        
                        <Grid item xs={4} style={{marginTop:"100px"}}>
                            <UploadPanel/>
                        </Grid>

                        <Grid item xs={4}>
                        </Grid>
                </Grid>
                </Box>
        </div>
    )
}

export default Home
