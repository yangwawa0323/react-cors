import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from '@mui/material/TextField'
import axios from 'axios';
import { ArrowForward } from '@mui/icons-material';
import { Alert, AlertTitle, Button, Snackbar } from '@mui/material'

function App() {
  const [value, setValue] = React.useState('')
  const [responseData, setResponseData] = React.useState(null)
  const [error, setError] = React.useState(null)


  const handleClose = () => {
    setError(null)
  }

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

        if (err.response.status === 400) {
          setError(err.response.message)
        }
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
            {JSON.stringify(responseData, null, 2)}
          </p>
          {error &&
            <div>
              <Snackbar
                anchorOrigin={{ "vertical": "top", "horizontal": "center" } }
                open={!!error} autoHideDuration={3000} onClose={handleClose}>
                <Alert variant="filled" severity="error">
                  {error.response.data.error}
                </Alert>
              </Snackbar>
            </div>
          }
        </div>
      </header >
    </div >
  );
}

export default App;
