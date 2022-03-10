import React from 'react';
import { GameStatus } from '../../model/GameStatus';

function EndGame(props: any) {
    const {player} = props
    let endGameMessage: JSX.Element =  <div></div>

    function messageEnd() {
        if(player.playerMancala > player.opponentMancala) {
            return "You're the winner, congrats =)"
        }

        if(player.playerMancala < player.opponentMancala) {
            return "You did lose the game =( ... a wise person learns from their losses"
        }

        if(player.playerMancala === player.opponentMancala) {
            return "It's a draw, start over to see who is the best"
        }
    }

    if(player.status === GameStatus.FINISHED) {
        endGameMessage = <div>
            <div className="stage-background">
            </div>
            <div className="stage">
                {messageEnd()}
            </div>
        </div>
    }

    return (
        <div>
            {endGameMessage}
        </div>
    );
}

export default EndGame;