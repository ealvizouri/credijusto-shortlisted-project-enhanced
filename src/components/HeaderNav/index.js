import { Link } from "react-router-dom";
import { useAuth } from '../../helpers/Helpers';
import Logo from '../Logo';
import UserSolid from '../../assets/icons/UserSolid';

const HeaderNav = () => {
    const auth = useAuth();

    return (<div className="header-nav d-flex justify-content-between">
        <div>
            <Logo redirect="/dashboard" />
        </div>
        <div className="welcome d-flex align-items-center">
            <span>
                Hi {auth.user.name}!
            </span>
            <Link to={{pathname: "/profile"}}>
                <UserSolid />
            </Link>
        </div>
    </div>)
};

export default HeaderNav;