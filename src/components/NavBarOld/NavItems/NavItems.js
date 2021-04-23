import React from 'react';
import NavItem from './NavItem/NavItem';
import classes from './NavItems.module.css';
import Rapper from '../../../utils/rapper';

const NavItems = (props) => {
    let navigationItems = null;
    if(props.isAuthenticated) {
        navigationItems= <Rapper>

            <NavItem className={classes.navlink} link="/logout">Logout</NavItem>
            <NavItem className={classes.navlink} link="/">{props.user}</NavItem>
            <NavItem className={classes.navlink} link="/threads/new">New Thread</NavItem>
            <li className={classes.logoItem}><a href="/">The Urban Forum</a></li>
        </Rapper>
         
     }
     else{
        navigationItems = (
        <Rapper>
        <NavItem className={classes.navlink} link="/login">Login</NavItem>
        <NavItem className={classes.navlink} link="/signup">Sign Up</NavItem>
        <li className={classes.logoItem}><a href="/">The Urban Forum</a></li>
        </Rapper>
        );
     }

     
    
    return (
        <ul className={classes.NavItems}>
            {navigationItems}
        </ul>
    )
}

export default NavItems;