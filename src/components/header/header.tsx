import {useLocation, useHistory} from 'react-router';
import logo from '../../assests/img/GeoDotCaBanner.jpg';
import './header.scss';

export default function Header(): JSX.Element {
    const history = useHistory();
    const location = useLocation();
    
    return (
        <header className="header">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-3 header-logo-col">
                        <img src={logo} alt="" onClick={()=>history.push('/' + location.search)} />
                    </div>
                    <div className="col-9 header-nav-col">
                        <nav className="header-nav">
                            <ul className="list-group flex-row justify-content-end align-items-center menu-list">
                                <li className="list-group-item">
                                    <a href="#">Home</a>
                                </li>
                                <li className="list-group-item">
                                    <a href="#">Français</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
