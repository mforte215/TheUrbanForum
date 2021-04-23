import React from 'react';
import NavItems from './NavItems/NavItems';
import classes from './NavBar.module.css';
const NavBar = (props) => {


    return (
        <div className={classes.NavBar}>
            <nav>
                <NavItems isAuthenticated={props.isAuthenticated} user={props.user} />
            </nav>
        </div>
    )
}

export default NavBar;