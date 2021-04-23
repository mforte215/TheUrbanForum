import React from 'react';
import classes from './ForumFloor.module.css';


const ForumFloor = (props) => {

    return (
        <div id={props.id} className={classes.floor} onClick={props.clicked}>
            <h1>{props.name}</h1>
        </div>
    )
}


export default ForumFloor;