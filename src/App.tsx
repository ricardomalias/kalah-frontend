import React from 'react';
import './App.css';
import CreateGame from './feature/CreateGame/CreateGame'
import GameBoard from './feature/GameBoard';

function App() {

  var playerKey: String = "";
  let stage;

  if(!playerKey) {
    stage = <CreateGame />
  } else {
    stage = <GameBoard />
  }

  return (
    <div className="App">
      <header className="App-header">
        {stage}
      </header>
    </div>
  );
}

export default App;
