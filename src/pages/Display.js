import React,{useState,useEffect,forwardRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import UploadPanel from '../components/UploadPanel'
import { useLocation } from "react-router-dom";
import MaterialTable, { MTableGroupbar } from "@material-table/core";
import axios from "axios";

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
      height: 200,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    },
  }));
function Display() {
    const classes = useStyles();
    const location = useLocation();
    const [data,setData]= useState([])
    console.log("state",location.state)
    const [myIdeasTableColumns, setMyIdeasTableColumns] = useState([
        { title: "ID", field: "id", editable: "never", width: "10%" },
        { title: "userId", field: "userId", editable: "never", width: "10%" },
        { title: "Title", field: "title", editable: "never", width: "10%" },
        { title: "Body", field: "body", editable: "never", width: "10%" },
      ]);

      useEffect(()=>{
        axios.get('https://financepeer-be.herokuapp.com/data')
        .then((res)=>{
            console.log(res.data)
            setData(res.data)
        }).catch((err)=>{
            console.log(err)
        })
      })
    return (
        <div style={{height:"100vh"}}>
            <Box sx={{ flexGrow: 1 }} >
                <Grid container style={{textAlign:"center"}}>
                        
                        
                        <Grid item xs={10} style={{marginTop:"100px"}}>
                        <MaterialTable
                            icons={tableIcons}
                            title="Uploaded Data"
                            columns={myIdeasTableColumns}
                            data={data}
                            
                        />
                        </Grid>

                </Grid>
                </Box>
        </div>
    )
}

export default Display
