import React from 'react';
import classes from './ForumExplorer.module.css';
import ForumFloors from '../ForumFloors/ForumFloors';
const ForumExplorer = (props) => {






    return (
        <div className={classes.ForumExplorer}>
            <ForumFloors />
        </div>
    )
}

export default ForumExplorer;