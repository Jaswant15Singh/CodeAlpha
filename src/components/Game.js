import React, { useState } from 'react'
import Board from './Board'
import "../Chat.css"
import { Window,MessageList,MessageInput } from 'stream-chat-react';
const Game = ({channel}) => {
const [playersJoined,setPlayersJoined]=useState(channel.state.watcher_count===2);

const[result,setResult]=useState({winner:"none",state:"none"});
    
   channel.on("user.watching.start",(event)=>{
    setPlayersJoined(event.watcher_count===2)
   })
   if(!playersJoined){
    return(
        <div>
            Waiting for other palyer to Join
        </div>
    )
   } 

  return (
    <div className='gameContainer'>
        <Board result={result} setResult={setResult}/>
        <Window>
          <MessageList disableDateSeparator closeReactionSelectorOnClick hideDeletedMessages messageActions={["react"]}/>
          <MessageInput noFiles/>
        </Window>
      {/* Leave the Game */}
    </div>
  )
}

export default Game
