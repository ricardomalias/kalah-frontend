import React from 'react'
import './Cup.css'

interface cup {
    key: number,
    stones: number,
    index: number,
    position: number | null,
    moveCallback: Function,
}

function Cup(props: cup) {
    const { stones, index, position, moveCallback } = props
    let items: Array<JSX.Element> = []

    function move() {
        // if(!position) {
        //     alert("you cannot move the other player cup")
        //     return false;
        // }

        moveCallback(position)
    }

    for(let i = 0; i < stones; i++) {
        items.push(
            <div key={i} className="stone">
            </div>
        )
    }

    return (
        <div className="table-cell">
            <div className={!position ? "cup" : "cup cup-clickable"} onClick={move}>
                <div className="counter">
                    {stones}
                </div>
                {items}
            </div>
        </div>
    )
}

export default Cup;