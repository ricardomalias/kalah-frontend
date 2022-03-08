import React, { useState } from 'react';
import './CreateGame.css'
import Instruction from './Instruction';

function CreateGame() {

    const [displayForm, setDisplayForm] = useState(false);

    function changeForm() {
        setDisplayForm(true)
    }

    let form: JSX.Element = <div>
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

    const submitForm = (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        let formObject = Object.fromEntries(formData.entries())

        console.log("geroudo")
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formObject)
        };
        fetch('http://localhost:8080/game/', requestOptions)
            .then(response => {
                console.log(response.json())
            });
            // .then(data => this.setState({ postId: data.id }));
    }

    if(displayForm) {
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

    return (
        <div>
            <div>
                {form}
            </div>
        </div>
    );
}

export default CreateGame;