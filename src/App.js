import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './App.css';

function App() {

  // input states
  const [userName, setUserName] = React.useState('')
  const [userMessage, setUserMessage] = React.useState('')

  // response state
  const [messageList, setMessageList] = React.useState([])

  // re recieve messages from server
  const [getMessages, setGetMessages] = React.useState(true)

  // send message to server
  const handleSubmitFeedback = () => {
    if(userName === '' || userMessage === '') {
      alert('Please enter your name and message')
      return;
    }

    fetch('https://testing-module-7-default-rtdb.asia-southeast1.firebasedatabase.app/feedback.json',
         {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              userName: userName,
              userMessage: userMessage,
          })
        }
    )
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setUserMessage('')
      setUserName('')
      setGetMessages(true)
    })
  }

  // get messages from server
  useEffect(() => {
    if(getMessages) {
      fetch('https://testing-module-7-default-rtdb.asia-southeast1.firebasedatabase.app/feedback.json')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const loadedFeedback = [];
        for(const key in data) {
          loadedFeedback.push({
            id: key,
            userName: data[key].userName,
            userMessage: data[key].userMessage,
          })
        }
        console.log(loadedFeedback)
        setMessageList(loadedFeedback)
      })
      setGetMessages(false)
    }
  }, [getMessages])

  return (
    <div className='app-container'>
      <div className='form-container'>
        <h2>Feedback Form</h2>
        <TextField
          required
          id="outlined-required"
          label="Full Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <TextField
          id="outlined-textarea"
          label="Feedback"
          placeholder="Placeholder"
          rows={4}
          multiline
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />

      <Button variant="contained"
        onClick={handleSubmitFeedback}
      >Contained</Button>
      </div>

      <div className='feedback-container'>
        {
          messageList && messageList.map((item, index) => {
            return (
              <div className='feedback-item' key={index}>
                <h3>{item.userName}</h3>
                <p>{item.userMessage}</p>
              </div>
            )
          })
        }
      </div>
    </div>  
  );
}

export default App;
