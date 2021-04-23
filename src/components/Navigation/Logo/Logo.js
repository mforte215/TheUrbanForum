import { NavLink } from 'react-router-dom';
import classes from './Logo.module.css';
import udlogo from '../../../assets/logo.png';

const Logo = () => {
    return (
        <div className={classes.LogoWrapper}>
            <div className={classes.LogoImg}>
                <NavLink to="/"><img src={udlogo} alt="cityscape logo" /></NavLink>
            </div>
            <NavLink className={classes.Link} to="/"><h2 className={classes.LogoText}>Urban Discussion</h2></NavLink>
        </div>
    )
}

export default Logo;