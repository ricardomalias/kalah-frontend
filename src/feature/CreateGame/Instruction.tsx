import React from 'react';

function Instruction() {

    return (
        <div>
            <h1>
                Welcome to Kalah game
            </h1>
            <h2>
                How to play ?
            </h2>
            <br/>
            <div>
                <div className="instruction">
                    <ul>
                        <li>
                            The objective of the game is to collect as many playing pieces as possible before one of the players clears their side of all the playing pieces.
                        </li>
                        <li>
                            The row of six cups below is yours and the above is from the player
                        </li>
                        <li>
                            Going counter-clockwise, the beginning player takes all four stones in one cup on their side and places one stone each in any four adjacent cups.
                            Players can only grab stones that are on their side.
                        </li>
                        <li>
                            If your last stone falls into your Mancala, take another turn.
                        </li>
                        <li>
                            When one player's six cups are completely empty, the game ends. The player who still has stones left in their cups captures those stones and puts them in their Mancala
                        </li>
                    </ul>
                </div>
                <div className="instruction">
                    <ul>
                        <li>
                            On each turn you can choose a position to distribute the stones in the cups
                        </li>
                        <li> 
                            Your mancala is the big basin to your right. Also called a "store," it is where captured pieces are placed                           
                        </li>
                        <li>
                            Players can put stones in their own Mancala, but not in their opponent's Mancala. If you have enough stones to reach your opponent's Mancala, skip it.
                        </li>
                        <li>
                            If the last stone you drop is in an empty cup on your side, capture that piece along with any pieces in the hole directly opposite.
                        </li>
                        <li>
                            The player with the most stones wins.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Instruction;