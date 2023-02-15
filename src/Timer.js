import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import { useState, useContext, useEffect, useRef } from 'react';
import SettingContext from './SettingContext';
import ForwardButton from './ForwardButton';
import BackwardButton from './BackwardButton';


function Timer() {
    const context = useContext(SettingContext);
    const [isPause, setisPause] = useState(true);
    const [mode, setmode] = useState('work'); // work break null
    const [secondLeft, setsecondLeft] = useState(0);
    const secondLeftRef=useRef(secondLeft);
    const isPauseRef=useRef(isPause);
    const modeRef=useRef(mode);


    function switchMode() {
        const nextMode = modeRef.current === 'work' ? 'break' : 'work';
        const nextSeconds = (nextMode === 'work' ? context.workMinutes : context.breakMinutes) * 60;
        setmode(nextMode);
        modeRef.current=nextMode;
        setsecondLeft(nextSeconds);
        secondLeftRef.current=nextSeconds;
        if(modeRef.current==='break')
        {
            playerRun();
        }
        else{
            playerStop();
        }
    }

    function playerRun(){
        var frame = document.getElementById("player"); frame.contentWindow.postMessage(
            '{"event":"command","func":"playVideo","args":""}',
            '*');
    }

    function playerStop()
    {
        var frame = document.getElementById("player"); frame.contentWindow.postMessage(
            '{"event":"command","func":"pauseVideo","args":""}',
            '*');
    }

    function tick() {
        secondLeftRef.current--;
        setsecondLeft(secondLeftRef.current);
    }

    function initTimer() {
        secondLeftRef.current=context.workMinutes * 60;
        setsecondLeft(secondLeftRef.current);
    }
    useEffect(() => {
        initTimer();
        const Interval=setInterval(() => {
            if (isPauseRef.current) {
                return;
            }
            if (secondLeftRef.current === 0) {
                return switchMode();
            } tick();
        }, 1000);
        return ()=>clearInterval(Interval);
    }, [context]);

    const totalSeconds = mode==='work' ? context.workMinutes*60 : context.breakMinutes*60;
    const percentage= Math.round(secondLeft/totalSeconds*100);
    const minutes= Math.floor(secondLeft/60);
    let second= secondLeft%60;
    if(second < 10)
    {
        second= '0'+second
    }
    let clr= '#C70039';
    if(mode==='work')
    {   
        if(percentage===100)
        {
        }
        else if(percentage>=66 && percentage<=99)
        {
            clr='#C70039';
        }
        else if(percentage<66 && percentage>33)
        {
            clr='#00FFFF'
        }
        else
        {
            clr='#AFE1AF'
        }
    }
    else{
        clr= '#808080' 
    }

    return (
        <div>
            <CircularProgressbar value={percentage} text={minutes +':'+second} styles={buildStyles({ textColor: '#fff', pathColor: clr,backgroundColor: '#3e98c7' })} />
            <div style={{ marginTop: '1%' }}>
                {isPause ? <PlayButton onClick={()=> {setisPause(false); isPauseRef.current=false;}}/> : 
                <PauseButton onClick={()=> {setisPause(true); isPauseRef.current=true; } } />}
            </div>
        </div>
    );
}

export default Timer;