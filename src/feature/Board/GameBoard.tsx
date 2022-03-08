import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlayerContext } from '../../App';
import { GameStatus } from '../../model/GameStatus';
import Player from '../../model/Player';

function GameBoard(props: any) {

    const [loading, setLoading] = useState(false)
    const [player, setPlayer] = useState({} as Player)
    const { playerKeyUrl } = useParams();

    function getPlayer() {
        return new Promise(resolve => {
            setLoading(true)

            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };

            fetch(`http://localhost:8080/game/${playerKeyUrl}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setPlayer(data)
                    setLoading(false)
                    resolve("success")
                })
                .catch((e) => {
                    console.log(e)
                    setLoading(false)
                    resolve("error")
                });
        })
    }

    function ping() {
        setTimeout(async () => {
            console.log("ping")
            await getPlayer()
            ping()
        }, 20000);
    }

    if(!player.playerKey && !loading) {
        getPlayer()
        ping();
    }

    return (
        <div>
            <div>
                Game board {player.playerName}
            </div>
        </div>
    );
}

export default GameBoard;