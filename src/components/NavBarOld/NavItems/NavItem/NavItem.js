import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavItem.module.css';

const NavItem = (props) => {

    return (
        <div>
            <li className={classes.NavItem}><NavLink to={props.link}>{props.children}</NavLink></li>
        </div>
    )
}

export default NavItem