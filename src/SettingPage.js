import ReactSlider from 'react-slider';
import SettingContext from './SettingContext';
import './slider.css';
import { useContext } from 'react';
import BackButton from './BackButton';

function SettingPage()
{
    const context = useContext(SettingContext);
    return(
        <div style={{textAlign:'center'}}>
            <label>Work: {context.workMinutes}:00</label>
            <ReactSlider
            className={'slider'}
            thumbClassName={'thumb'}
            trackClassName={'track'}
            value={context.workMinutes}
            min={1}
            max={120}
            onChange={newValue => context.setworkMinutes(newValue)}
            ></ReactSlider>
            <label>Break: {context.breakMinutes}:00</label>
            <ReactSlider
            className={'slider green'}
            thumbClassName={'thumb'}
            trackClassName={'track'}
            value={context.breakMinutes}
            min={1}
            max={120}
            onChange={newValue => context.setbreakMinutes(newValue)}
            ></ReactSlider>
            <div style={{textAlign:'center', marginTop:'20px'}}>
            </div>
            </div>
    );
}

export default SettingPage;