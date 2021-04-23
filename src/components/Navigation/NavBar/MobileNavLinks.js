import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Accessibility from './Accessibility';
import Toggle from './Toggle';
import classes from './MobileNavLinks.module.css';

const MobileNavLinks = (props) => {
    const [isOpen, setIsOpen] = useState(false);


    if (props.isAuthenticated) {
        return (
            <div className={classes.NavLinksContainer}>
                <Toggle isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
                {isOpen && (
                    <ul className={classes.LinksWrapper}>
                        <li className={classes.LinkItem}>
                            <NavLink className={classes.Link} to="/threads/new">New Thread</NavLink>
                        </li>
                        <li className={classes.LinkItem}>
                            <NavLink className={classes.Link} to="/">Home</NavLink>
                        </li>
                        <div className={classes.Marginer}></div>
                        <Accessibility isAuthenticated={props.isAuthenticated} />
                    </ul>
                )}
            </div>
        )
    }
    else {
        return (
            <div className={classes.NavLinksContainer}>
                <Toggle isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
                {isOpen && (
                    <ul className={classes.LinksWrapper}>
                        <li className={classes.LinkItem}>
                            <NavLink className={classes.Link} to="/">Home</NavLink>
                        </li>
                        <div className={classes.Marginer}></div>
                        <Accessibility isAuthenticated={props.isAuthenticated} />
                    </ul>
                )}
            </div>
        )
    }
}

export default MobileNavLinks;