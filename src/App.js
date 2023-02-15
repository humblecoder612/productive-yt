import './App.css';
import Timer from './Timer'
import SettingPage from './SettingPage';
import { useState } from 'react';
import SettingContext from './SettingContext';
import YoutubeContext from './YoutubeContext';
import SettingButton from './SettingButton';
import BackButton from './BackButton';
import Youtube from './Youtube';


function App() {
  const [showSetting,setshowSetting]= useState(false);
  const [workMinutes,setworkMinutes]=useState(45);
  const [breakMinutes,setbreakMinutes]=useState(15);
  const [content,setcontent]=useState('https://www.youtube.com/embed/?listType=playlist&list=RDGMEMYH9CUrFO7CfLJpaD7UR85wVMq74fX9CnqtQ');
  return (
    <div className="grid-container">
      <div className="grid-item header">
      <input id='youtube-playlist' type="text" placeholder=" &#x1F50E; YOUTUBE PLAYLIST" onChange={(evt) => { if(evt.target.value!=undefined) {setcontent(evt.target.value);}}} />
      </div>
      <div className="grid-item setting">
      {showSetting ? <BackButton onClick={() => setshowSetting(false)} /> : <SettingButton onClick={() =>setshowSetting(true)}/>}
      </div>
      <div className="grid-item youtube">
        <YoutubeContext.Provider value={{content,setcontent}}>
        <Youtube  />
        </YoutubeContext.Provider>
      </div>
      <div className="grid-item pomo">
      <SettingContext.Provider value={{
        showSetting,
        setshowSetting,
        workMinutes,
        breakMinutes,
        setworkMinutes,
        setbreakMinutes
      }}>
      {showSetting ? <SettingPage/> : <Timer/>}
      </SettingContext.Provider>
    </div>
    </div>
  );
}

export default App;
