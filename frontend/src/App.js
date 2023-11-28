import './App.css';
import addBtn from './assets/add-30.png'
import msgIcon from './assets/message.svg'
import home from './assets/home.svg'
import saved from './assets/bookmark.svg'
import account from './assets/rocket.svg'
import sendBtn from './assets/send.svg'
import userIcon from './assets/user-icon.png'
import llamaLogo from './assets/llamaLogo.webp'
import aiIcon from './assets/terminator.jpeg'
import { sendMsg } from './llama';
import { useEffect, useRef, useState } from 'react';

let context = null;
function App() {
  const msgEnd = useRef(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hi, I am a chatbot based on LLaMA-2. Ask anything you want.",
      isBot: true
    }
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  const handleSend = async () => {
    const text = input;
    setInput('');
    setMessages([...messages, { text, isBot: false }]);
    // console.log("Before context is app: " + context);
    const [res, newContext] = await sendMsg(text, context);
    context = newContext;
    setMessages([
      ...messages,
      { text, isBot: false },
      { text: res, isBot: true }
    ]);
    // console.log(messages);
    // console.log("After context in app: " + context);
  }

  const handleEnter = async (e) => {
    if (e.key === 'Enter') await handleSend();
  }

  return (
    <div className="App">
      <div className="sideBar">
        <div className='upperSide'>
          <div className='upperSideTop'>
            <img src={llamaLogo} alt='logo' className='logo' />
            <span className='brand'>LLaMA Playground</span>
          </div>
          <button className='newChat' onClick={() => { window.location.reload() }}> <img src={addBtn} alt='new chat' className='addBtn' />new chat</button>
          <div className='upperSideBottom'>
            <button className='query'> <img src={msgIcon} alt='query' />How did we get here?</button>
            <button className='query'> <img src={msgIcon} alt='query' />Why did we get here?</button>
          </div>
        </div>
        <div className='lowerSide'>
          <div className='listItems'><img src={home} alt='home' className='listItemsImg' />Home</div>
          <div className='listItems'><img src={saved} alt='saved' className='listItemsImg' />Saved</div>
          <div className='listItems'><img src={account} alt='account' className='listItemsImg' />Account</div>
        </div>
      </div>
      <div className='main'>
        <div className='chats'>

          {messages.map((message, i) =>
            <div key={i} className={message.isBot ? 'chat bot' : 'chat'}>
              <img className='chatImg' src={message.isBot ? aiIcon : userIcon} alt='' /><p className='txt'>{message.text}</p>
            </div>
          )}

          <div ref={msgEnd} />
        </div>
        <div className='chatFooter'>
          <div className='inp'>
            <input
              type='text'
              placeholder='Type your prompt...'
              value={input}
              onKeyDown={handleEnter}
              onChange={(e) => { setInput(e.target.value) }}
            />
            <button className='send' onClick={handleSend}>
              <img src={sendBtn} alt='send arrow' />
            </button>
          </div>
          <p>Made by Sarthak Tanwar for fun</p>
        </div>
      </div>
    </div>
  );
}

export default App;