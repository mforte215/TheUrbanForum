import classes from './Comment.module.css';
import React, {useState, useEffect} from 'react';
import dompurify from 'dompurify';
import dateFormat from 'dateformat';

const Comment = (props) => {

    let formattedDate = null;




    const santizeContent = (content) => {
        const cleanInput = dompurify.sanitize(content);
        return cleanInput;
    }
    
    const setContent = (wrapper) => {
        wrapper = santizeContent(wrapper);
        return {__html: wrapper}
    }

    if(props.createdAt) {

        let formattedDateObj = new Date(props.createdAt);
        formattedDate = dateFormat(formattedDateObj, "dddd, mmmm dS, yyyy, h:MM TT");
    }

    if(props.isOwner) {
        return (
            <div className={classes.comment}>
                <p className={classes.user}>{props.owner} says</p>
                <div className={classes.commentBody} dangerouslySetInnerHTML={setContent(props.content)} />
                <div className={classes.controls}>
                <label className={classes.commentLabel}>{formattedDate}</label>
                <button onClick={props.click}>Delete</button>
                <button onClick={props.onEditClick}>Edit</button>
                </div>
                
            </div>
        )
    }
    else {
        return (
            <div className={classes.comment}>
            <p className={classes.user}>{props.owner} says</p>
            <div className={classes.commentBody} dangerouslySetInnerHTML={setContent(props.content)} />
            <div className={classes.controls}>
            <label className={classes.commentLabel}>{formattedDate}</label>
            </div>
        </div>

        )
    }


}

export default Comment;