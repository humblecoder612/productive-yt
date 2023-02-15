import { useContext,useState,useEffect,useRef } from 'react';
import YouTubeContext from './YoutubeContext';
import BackwardButton from './BackwardButton';
import ForwardButton from './ForwardButton';

function Youtube() {
    const context = useContext(YouTubeContext);
    let link=context.content;
    const [id,setid]=useState(link);
    const idRef=useRef(id);
    const base="https://www.youtube.com/embed/?listType=playlist&list=";
    
    function playlistfinder()
    {
        let result = link.indexOf("list=");
        result=result+5;
        let resultend=link.indexOf('&',result);
        if(resultend == -1)
        {
            idRef.current=link.substring(result,link.length)
        }
        else
        {
        idRef.current=link.substring(result,resultend);
        }
        setid(idRef.current);
    }
    useEffect(() => {
    playlistfinder();
    console.log(id);
    }, [context]);

    return (
        <div>
        <div style={context.disable ? {} : {pointerEvents:'none'}}>
        <iframe id="player" title="YouTube Playlist" src={base+id+'&enablejsapi=1&controls=0?rel=0'} frameborder="0" allowfullscreen allow='autoplay'></iframe>
        </div>
        <BackwardButton onClick={()=>{var frame = document.getElementById("player"); frame.contentWindow.postMessage(
                  '{"event":"command","func":"previousVideo","args":""}',
                  '*'); var frame = document.getElementById("player"); frame.contentWindow.postMessage(
                    '{"event":"command","func":"stopVideo","args":""}',
                    '*');}}/><ForwardButton onClick={()=>{var frame = document.getElementById("player"); frame.contentWindow.postMessage(
                  '{"event":"command","func":"nextVideo","args":""}',
                  '*'); var frame = document.getElementById("player"); frame.contentWindow.postMessage(
                    '{"event":"command","func":"stopVideo","args":""}',
                    '*');}}/>
        </div>
    );


}

export default Youtube;