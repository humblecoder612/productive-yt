import './App.css';
import Timer from './Timer'
import SettingPage from './SettingPage';
import { useState } from 'react';
import SettingContext from './SettingContext';
import YoutubeContext from './YoutubeContext';
import SettingButton from './SettingButton';
import BackButton from './BackButton';
import Youtube from './Youtube';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


function App() {
  const [showSetting, setshowSetting] = useState(false);
  const [workMinutes, setworkMinutes] = useState(45);
  const [breakMinutes, setbreakMinutes] = useState(15);
  const [disable, setdisable] = useState(false);
  const [info,setinfo]= useState(false);
  const [content, setcontent] = useState('https://www.youtube.com/embed/?listType=playlist&list=RDGMEMYH9CUrFO7CfLJpaD7UR85wVMq74fX9CnqtQ');
  return (
    <div className="grid-container">
      <div className="grid-item header">
      <Popup className='mypop'
    trigger={open => (
      <button className="button">About</button>
    )}
    position="bottom left"
    closeOnDocumentClick
  >
     <span> Pomodoro Technique - Work with full focus, in break time enjoy your playlist. </span>
  </Popup>
 <input id='youtube-playlist' type="text" placeholder=" &#x1F50E; YOUTUBE PLAYLIST" onChange={(evt) => { if (evt.target.value != undefined) { setcontent(evt.target.value); } }} />
      </div>
      <div className="grid-item setting">
        {showSetting ? <BackButton onClick={() => setshowSetting(false)} /> : <SettingButton onClick={() => setshowSetting(true)} />}
      </div>
      <div className="grid-item youtube">
        <YoutubeContext.Provider value={{ disable, content, setcontent }}>
          <Youtube />
        </YoutubeContext.Provider>
      </div>
      <div className="grid-item pomo">
        <SettingContext.Provider value={{
          disable, setdisable,
          showSetting,
          setshowSetting,
          workMinutes,
          breakMinutes,
          setworkMinutes,
          setbreakMinutes
        }}>
          {showSetting ? <SettingPage /> : <Timer />}
        </SettingContext.Provider>
      </div>
    </div>
  );
}

export default App;
