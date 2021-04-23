import { NavLink } from 'react-router-dom';
import classes from './Accessibility.module.css';

const Accessibility = (props) => {

    if(props.isAuthenticated) {
        return (
            <div className={classes.AccessibilityContainer}>
               <NavLink to='/logout'><button className={classes.LoginButton}>Logout</button></NavLink>
            </div>
        )
    }
    else {
        return (
            <div className={classes.AccessibilityContainer}>
                <NavLink to="/signup"><button className={classes.RegisterButton}>Register</button></NavLink>
                <NavLink to="/login"><button className={classes.LoginButton}>Login</button></NavLink>
            </div>
        )
    }


}

export default Accessibility;