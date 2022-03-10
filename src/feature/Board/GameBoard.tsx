import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Player from '../../model/Player';
import Cup from './Cup';
import Mancala from './Mancala';
import './GameBoard.css'
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { GameStatus } from '../../model/GameStatus';
import EndGame from './EndGame';
import { RELOAD_TIMER, URL_BACKEND } from '../../config/config';
import useRecursiveTimeout from '../../config/useRecursiveTimeout';

function GameBoard(props: any) {

    dayjs.extend(duration)
    const [loading, setLoading] = useState(false)
    const [player, setPlayer] = useState({} as Player)
    const { playerKeyUrl } = useParams();
    let cupElements: Array<JSX.Element> = []
    let header: JSX.Element = <span>Loading...</span>

    function getPlayer() {
        return new Promise(resolve => {

            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };

            fetch(`${URL_BACKEND}/game/${playerKeyUrl}/player`, requestOptions)
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

    function move(position: number) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                playerKey: playerKeyUrl,
                position: position
            })
        };

        fetch(`${URL_BACKEND}/round/move`, requestOptions)
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
        if(player.playerKey) {
            for(let index = 1; index <= 12; index++) {
                let position = resolvePlayerCupPosition(index, player.playerNumber)
                let stones = player.cups[position]
        
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
    }

    useRecursiveTimeout(async () => {
        if (player.status !== GameStatus.FINISHED) {

            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' }
            };
    
            setLoading(true)
            await fetch(`${URL_BACKEND}/game/${playerKeyUrl}/ping`, requestOptions)
            await getPlayer()
            setLoading(false)
        }
    }, RELOAD_TIMER)

    if(!player.playerKey && !loading) {
        getPlayer()
    } else {
        processBoard()
    }

    if(player.playerName) {
        header = <span>
            <div className="header-item">
                {player.playerName ? <span>Playing as <b>{player.playerName}</b></span> : ""}
            </div>
            <div className="header-item">
                Turn: {player.matchTurn}
            </div>
            <div className="header-item">
                Time: {dayjs.duration(player.matchTime, 'milliseconds').format("HH:mm:ss")}
            </div>
            <div className="header-item">
                {player.playerTurn ? <span className="green">Your Turn</span> : <span className="red">Wait the other player</span>}
            </div>
        </span>
    }

    return (
        <div>
            <EndGame player={player}/> 
            <div className="header">
                {header}
                <div className="header-item header-item-right">
                    {loading ? "Loading..." : ""}
                </div>
            </div>
            <div className="table">
                {cupElements}
            </div>
        </div>
    );
}

export default GameBoard;