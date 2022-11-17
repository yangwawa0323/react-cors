import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from '@mui/material/TextField'
import axios from 'axios';
import { ArrowForward } from '@mui/icons-material';
import { Button } from '@mui/material'

function App() {
  const [value, setValue] = React.useState('')
  const [responseData, setResponseData] = React.useState(null)
  const [error, setError] = React.useState(null)

  const postData = async () => {
    await axios.post(`${process.env.REACT_APP_API_SERVER}/api/page/new`, {
      content: value,
    }, {
      Headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setResponseData(response.data)
      })
      .catch(err => {
        console.log("[DEBUG]:", err)
        setError(err);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TextField
          id=""
          label="Post content"
          value={value}
          onChange={e => setValue(e.target.value)}

        />
        <Button onClick={postData} variant="outlined" color="primary" endIcon={<ArrowForward />}>
          Post
        </Button>
        <div className="output">
          <h6>
            Response :
          </h6>
          <p>
            {responseData}
          </p>
          <h6>Error: </h6>
          <p>
            { error && JSON.stringify(error, null ,2 )}
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;
