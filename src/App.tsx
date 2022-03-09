import React, { createContext, useState } from 'react';
import './App.css';
import CreateGame from './feature/CreateGame/CreateGame'
import GameBoard from './feature/Board/GameBoard';
import Player from './model/Player';
import Game from './model/Game';
import { GameStatus } from './model/GameStatus';
import { Route, Routes, useNavigate } from 'react-router-dom';

const PlayerContext = createContext({} as Player)

function App() {

    const [player, setPlayer] = useState({} as Player);
    const [link, setLink] = useState("")
    // const [searchParams, setSearchParams] = useSearchParams();

    function setupGame(game: Game) {
        let playerNew = {
            playerName: game.firstPlayerName,
            playerKey: game.firstPlayerKey,
            playerNumber: 1,
            playerPing: {},
            playerTurn: true,
            playerMancala: 0,
            matchTime: 0,
            status: GameStatus.WAITING,
            cups: game.cups
        } as Player

        setLink(`http://${window.location.host}/${game.secondPlayerKey}`)
        setPlayer(playerNew)
    }

    return (
        <div className="App">
            <header className="App-header">
                <Routes>
                    <Route path="/" element={<CreateGame callback={setupGame} link={link} player={player} />}>
                    </Route>
                    <Route path="/:playerKeyUrl" element={<GameBoard setPlayer={setPlayer} />}>
                    </Route>
                </Routes>
            </header>
        </div>
    );
}

export { App, PlayerContext };
