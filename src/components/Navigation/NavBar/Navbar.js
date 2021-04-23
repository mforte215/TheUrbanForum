import { useMediaQuery } from "react-responsive";
import { DeviceSize } from '../responsive/index';
import Logo from '../Logo/Logo';
import NavLinks from './NavLinks';
import Accessibility from './Accessibility';
import MobileNavLinks from './MobileNavLinks';
import classes from './Navbar.module.css';


const Navbar = (props) => {

    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });

    return (
        <div className={classes.NavbarContainer}>
            <div className={classes.LogoSection}>
            <Logo />
            </div>
            <div className={classes.CenterLinks}>
                {!isMobile && <NavLinks isAuthenticated={props.isAuthenticated} />}
            </div>
            <div className={classes.RightLinks}>
                {!isMobile && <Accessibility isAuthenticated={props.isAuthenticated} />}
                {isMobile && <MobileNavLinks isAuthenticated={props.isAuthenticated} />}
            </div>
        </div>
    )
}

export default Navbar;