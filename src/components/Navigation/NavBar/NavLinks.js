import classes from './NavLinks.module.css';
import { NavLink } from 'react-router-dom';

const NavLinks = (props) => {

    let navLinks;

    if (props.isAuthenticated) {
        return (
            <div className={classes.NavLinksContainer}>
                <ul className={classes.LinksWrapper}>
                    <li className={classes.LinkItem}>
                    <NavLink className={classes.Link} to="/threads/new">New Thread</NavLink>
                    </li>
                    <li className={classes.LinkItem}>
                    <NavLink className={classes.Link} to="/">Home</NavLink>
                    </li>
                </ul>
            </div>
        )
    }
    else {
        return (
            <div className={classes.NavLinksContainer}>
                <ul className={classes.LinksWrapper}>
                </ul>
            </div>
        )
    }


}

export default NavLinks;