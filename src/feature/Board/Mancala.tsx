import React from 'react';
import './Mancala.css'

function Mancala(props: any) {
    const { type, stones } = props
    let items: Array<JSX.Element> = []

    for(let i = 0; i < stones; i++) {
        items.push(
            <div key={i} className="stone">
            </div>
        )
    }

    return (
        <div className="table-cell">
            <div className={type + " mancala "}>
                <div className="score">
                    {stones}
                </div>
                <div className="mancala-stones">
                    {items}
                </div>
            </div>
        </div>
    )
}

export default Mancala