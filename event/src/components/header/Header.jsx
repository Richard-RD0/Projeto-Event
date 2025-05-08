import "./Header.css";
import Logo from "../../assents/img/logo1.svg";
import Admin from "../../assents/img/Admin.png"
import {Link} from "react-router-dom";
const Header = () => {
    return (
        <header>
            <div className="layout_grid cabecalho">
                {/*Estou a redeirecionar ao clickar na logo */}
            <Link to="/">
            <img src={Logo} alt="Logo do Event+" />
            </Link>
            <nav className="nav_header">
              <Link to="/Tipoevento" className="link_header" href="">Home</Link>
              <Link to="/CadastroEvento" className="link_header" href="">Eventos</Link>
              <Link to="/CadastroUsuario" className="link_header" href="">Usuários</Link>
              <Link to="/Contatos" className="link_header" href="">Contatos</Link>
            </nav>
            
            <nav className="nav_header admin">
              <Link to="/Administrador" className="link_header" href="">Administrador<img src={Admin} /></Link>
            </nav>

            </div>
        </header>
    )
}
export default Header;