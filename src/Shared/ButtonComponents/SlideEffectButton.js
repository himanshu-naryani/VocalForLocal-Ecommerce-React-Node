import React from 'react'
import './SlideEffectButton.scss'


function SlideEffectButton(props) {
    const clsname ="button-slideeffect-"+props.color+" btn"

    return (
        <div className={clsname} onClick={props.onClick} onKeyPress={props.onKeyPress}>
            {props.buttonName}
        </div>
    )
}

export default SlideEffectButton
