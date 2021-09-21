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
    const [fileData, setFileData] = useState()
    const [disabled, setDisabled]= useState(false)
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setErrorMsg()
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    //POST API
    if(fileData==undefined || fileData==""){
        setErrorMsg(<span style={{color:"orange"}}>Please upload a file.</span>)
    }else{
      console.log(fileData)
      setErrorMsg(<span style={{color:"blue"}}>Please wait while data is being uploaded.</span>)
      setDisabled(true)
    axios.post('https://roopesh-k.herokuapp.com/data',fileData)
    .then((res)=>{
        console.log(res)
        setErrorMsg(<span style={{color:"green"}}>{res.data}</span>)
        setFileData()
        setDisabled(false)
    }).catch((err)=>{
        console.log(err)
        setErrorMsg(<span style={{color:"red"}}>There was an error uploading the data.</span>)
        setFileData()
        setDisabled(false)

    })
    }
    
  };
  const showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
      console.log(JSON.parse(text))
    //   alert(text)
    setFileData(JSON.parse(text))
    };
    reader.readAsText(e.target.files[0])
  }
  const handleOpenDisplayData=()=>{
    history.push('./data')
  }
  return (
    <Box sx={{ width: '100%',backgroundColor:"white",color:"black"}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="Upload" {...a11yProps(0)} style={{width:"100%"}}/>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Typography className="enter">Please upload a JSON File</Typography><br /><br />
                    <div style={{textAlign:"center"}}>
                        <input
                            type="file"
                            onChange={(e) => showFile(e)}         
                        />
                    </div>
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={disabled}               
                    >
                    Upload
                    </Button>
                    {errorMsg}
            </Box>
            <br /><br />
            <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // disabled={disabled} 
                onClick={handleOpenDisplayData}              
                >
                Show Data
            </Button>
      </TabPanel>
      
    </Box>
  );
}