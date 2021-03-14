import React from 'react'
import './ElevatedButton.scss'
function ElevatedButton(props) {
    return (
        <div>
             <div className="btn btn-white btn-animate" onClick={props.onClick} onKeyPress={props.onKeyPress} 
             style={{backgroundColor:props.color , fontWeight:"bold", fontFamily:"sans-serif" , color:"white" , color:props.fontcolor}}
             
             >
            {props.buttonName}
            </div>
        </div>
    )
}

export default ElevatedButton
