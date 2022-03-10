import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_BACKEND } from '../../config/config';
import Game from '../../model/Game';
import { GameStatus } from '../../model/GameStatus';
import './CreateGame.css'
import Instruction from './Instruction';

function CreateGame(props: any) {

    const [displayForm, setDisplayForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const { link, callback, player } = props;
    const navigate = useNavigate()

    function changeForm() {
        setDisplayForm(true)
    }

    function createGame(data: Game) {
        callback(data)
        setLoading(false)
    }

    function startGame() {
        navigate(`/${player.playerKey}`)
    }

    let form: JSX.Element =  <div></div>;

    const submitForm = (event: any) => {
        event.preventDefault()
        setLoading(true)
        const formData = new FormData(event.target);
        let formObject = Object.fromEntries(formData.entries())

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formObject)
        };

        fetch(`${URL_BACKEND}/game/`, requestOptions)
            .then(response => response.json())
            .then(data => createGame(data))
            .catch((e) => {
                console.log(e)
                setLoading(false)
            });
    }

    if(!displayForm && !loading) {
        form = <div>
            <div>
                <Instruction/>
            </div>
            <br/>
            <br/>
            <button onClick={changeForm}>Create Game</button>
            <br />
            <br />
            &nbsp;
        </div>
    }

    if(displayForm && !loading && !link) {
        form = <form onSubmit={submitForm} method="post">
                    <label>
                        First Player Name:
                        <input type="text" name="firstPlayerName" />
                    </label>
                    <br />
                    <label>
                        Second Player Name:
                        <input type="text" name="secondPlayerName" />
                    </label>
                    <br />
                    <br />
                    <input type="submit" value="Start Game" />
                </form>
    }

    if(loading && !link) {
        form = <div>
            Carregando...
        </div>
    }

    let shareLink: JSX.Element = <div></div>
    if(link && player.status === GameStatus.WAITING) {
        shareLink = <div className="share">
            Share this link with the other player:
            <br/>
            <br/>
            {link}
            <br/>
            <br/>
            <button onClick={startGame}>
                Ok, I already shared it
            </button>
        </div>
    }

    return (
        <div>
            <div>
                {shareLink}
            </div>
            <div>
                {form}
            </div>
        </div>
    );
}

export default CreateGame;