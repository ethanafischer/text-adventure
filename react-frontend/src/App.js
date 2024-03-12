import { useState, useEffect} from "react";
import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [messageLog, setMessageLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    resetMessages();
  }, []);

  useEffect(() => {
    setMessageLog([
      { role: "assistant", content: "You are in a dark and dank prison cell." },
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
    setIsLoading(true);

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
    setIsLoading(false);
    
    } catch (err) {
        console.error('Error:', err);
        setIsLoading(false);
    }

  };

  const resetMessages = async () => {
    try {
      await fetch('http://127.0.0.1:5000/reset', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
      });
      setMessageLog([
        { role: "assistant", content: "You are in a dark and dank prison cell." }
      ]);
    } catch (error) {
      console.error('Error resetting messages:', error);
    }
  };

  return (
    <div className="App">
      <h1>Text Adventure</h1>
      <div className="chat-container" style={{ marginBottom: '20px' }}>
        {messageLog.map((message, index) => (
          <div key={index} className={message.role}>
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={userInput}
        onChange={handleChange}
        placeholder="What will you do?"
        style={{
          padding: '10px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          marginRight: '10px',
        }}
      />
      <button
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#000000',
          color: 'white',
          border: 'none',
          borderRadius: '16px',
          cursor: 'pointer'
        }}
      >
        {isLoading ? '...' : 'Enter'}
      </button>
    </form>       
    </div>
  );
}

export default App;
