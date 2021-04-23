import React from 'react';
import classes from './Discussion.module.css';
import dateFormat from 'dateformat';

const Discussion = (props) => {
    let formattedDate = null;

    if(props.createdAt) {

        let formattedDateObj = new Date(props.createdAt);
        formattedDate = dateFormat(formattedDateObj, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    }

    if (props.isOwner) {

        return (
            <div className={classes.Discussion}>
                <div className={classes.thread} onClick={props.clicked}>
                    <h1>{props.name}</h1>
                    <h3>by {props.username} @ {formattedDate}</h3>
                    </div>
                    <div className={classes.voteBox}>
                    <p className={classes.arrowClass}>&#8679;</p>
                    <p className={classes.arrowClass}>&#8681;</p>
                    </div> 
                    <div className={classes.controls}><button onClick={props.editClick}>Edit</button><button onClick={props.deleteClick}>Delete</button>
                </div>
            </div>
            )
    }

    else {
        return (
            <div className={classes.Discussion}>
                <div className={classes.thread} onClick={props.clicked}>
                    <h1>{props.name}</h1>
                    
                    <h3>by {props.username} @ {formattedDate}</h3>
                </div>
                <div className={classes.voteBox}>
                    <p className={classes.arrowClass}>&#8679;</p>
                    <p className={classes.arrowClass}>&#8681;</p>
                </div>
            </div>
            )

    }
    


}

export default Discussion;