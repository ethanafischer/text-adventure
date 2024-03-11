import { useState, useEffect} from "react";
import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [messageLog, setMessageLog] = useState([]);

  useEffect(() => {
    setMessageLog([
      { role: "assistant", content: "You are in a dark and dank prison cell." }
    ]);
  }, []);

  useEffect(() => {
    console.log("Message Log Updated:", messageLog);
  }, [messageLog]);

  const handleChange = (event) => {
    setUserInput(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/chat-gpt', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: userInput }),
      });
    

    const responseData = await response.json();

    setMessageLog([
      ...messageLog,
      { role: 'user', content: userInput },
      { role: 'assistant', content: responseData},
    ]);

    setUserInput('');
    
    } catch (err) {
        console.error('Error:', err);
    }

  };

  return (
    <div className="App">
      <div className="chat-container">
        {messageLog.map((message, index) => (
          <div key={index} className={message.role}>
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={handleChange}
          placeholder="What will you do?"
        />
        <button>Submit</button>
      </form>    
    </div>
  );
}

export default App;
