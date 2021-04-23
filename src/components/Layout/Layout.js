import React from 'react';
import NavBar from '../Navigation/NavBar/Navbar';
import Rapper from '../../utils/rapper';
import classes from './Layout.module.css';

const Layout = (props) => {

    return (
        <Rapper>
            <NavBar isAuthenticated={props.isAuthenticated} />
            <main className={classes.content}>
                {props.children}
            </main>
        </Rapper>
    )
}

export default Layout;