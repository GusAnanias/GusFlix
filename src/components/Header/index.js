import './style.css';
import { Link, link } from 'react-router-dom';

function Header(){
    return(
        <header>
            <Link className="logo" to="/">GusaFlix</Link>
            <Link className="favoritos" to="/favoritos">Meus filmes</Link>
        </header>
    )
}

export default Header;