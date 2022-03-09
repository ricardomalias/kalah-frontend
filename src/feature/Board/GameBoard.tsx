import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Player from '../../model/Player';
import Cup from './Cup';
import Mancala from './Mancala';
import './GameBoard.css'
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

function GameBoard(props: any) {

    dayjs.extend(duration)
    const [loading, setLoading] = useState(false)
    const [player, setPlayer] = useState({} as Player)
    const { playerKeyUrl } = useParams();
    let cupElements: Array<JSX.Element> = []

    function getPlayer() {
        return new Promise(resolve => {

            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };

            fetch(`http://localhost:8080/game/${playerKeyUrl}/player`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    setPlayer(data)
                    resolve("success")
                })
                .catch((e) => {
                    console.log(e)
                    resolve("error")
                });
        })
    }

    function ping() {
        setTimeout(async () => {
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' }
            };

            setLoading(true)
            await fetch(`http://localhost:8080/game/${playerKeyUrl}/ping`, requestOptions)
            await getPlayer()
            setLoading(false)
            ping()
        }, 20000);
    }

    function move(position: number) {
        console.log(position)

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                playerKey: playerKeyUrl,
                position: position
            })
        };

        fetch(`http://localhost:8080/round/move`, requestOptions)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                if(!data.playerKey) {
                    throw new Error(data.message)
                }

                setPlayer(data)
            })
            .catch((e) => {
                alert(e.message)
            });
    }

    function processCup(index: number, position: number, stones: number) {
        return <Cup key={index} index={index} stones={stones} position={position} moveCallback={move} />
    }

    function resolvePlayerCupPosition(index: number, playerNumber: number) {
        if(playerNumber === 1) {
            if(index < 7) {
                return 13 - index;
            }

            if(index > 6) {
                return index - 6;
            }
        }

        if(playerNumber === 2) {
            if(index < 7) {
                return 7 - index;
            }

            return index;
        }

        return 0;
    }

    function processBoard() {
        for(let index = 1; index <= 12; index++) {
            let position = resolvePlayerCupPosition(index, player.playerNumber)
            let stones = player.cups[position]
            // let index = parseInt(key)
    
            if(index === 1) {
                cupElements.push(<Mancala key="mancala-1" type="mancala-top" stones={player.opponentMancala} />)
            }

            if(index === 7) {
                cupElements.push(<div key="space-1" className="table-cell"></div>)
            }
    
            cupElements.push(
                processCup(index, position, stones)
            )
    
            if(index === 6) {
                cupElements.push(<div key="space-2" className="table-cell"></div>)
            }
    
            if(index === 12) {
                cupElements.push(<Mancala key="mancala-2" type="mancala-bottom" stones={player.playerMancala}/>)
            }
    
            if(index % 6 === 0) {
                cupElements.push(<div className="table-row" key={"break-" + index}>&nbsp;</div>)
            }
        }
    }

    if(!player.playerKey && !loading) {
        getPlayer()
        ping();
    }
    
    if(player.playerKey) {
        processBoard()
    }

    return (
        <div>
            <div className="header">
                <div className="header-item">
                    {player.playerName ? <span>Playing as <b>{player.playerName}</b></span> : ""}
                </div>
                <div className="header-item">
                    Turn: {player.matchTurn}
                </div>
                <div className="header-item">
                    Time: {dayjs.duration(player.matchTime, 'milliseconds').format("HH:mm")}
                </div>
                <div className="header-item header-item-right">
                    {loading ? "Carregando..." : ""}
                </div>
            </div>
            <div className="table">
                {cupElements}
            </div>
        </div>
    );
}

export default GameBoard;