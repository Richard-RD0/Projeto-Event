import "./Header.css";
import Logo from "../../assets/img/logo.svg"
import Portinha from "../../assets/img/Vector.png"
import { Link } from "react-router-dom";
import Botao from "../botao/Botao";
const Header = (props) => {
    return(
        <header>
            <link rel="stylesheet" href="https://use.typekit.net/pam4ubo.css"></link>

            <div className="layout_grid header-header">
            <img src={Logo} alt=""/>
            <nav className="nav_header">
                {/* <a href="" className="link-header">Home</a>
                <a href="" className="link-header">Eventos</a>
                <a href="" className="link-header">Usuários</a> 
                <a href="" className="link-header">Contatos</a>*/}
                
                <Link className="link-header" to="/">Home</Link>
                <Link className="link-header" to="/Evento">Eventos</Link>
                <Link className="link-header" to="/Tipousuario" style={{display:props.Usuario}}>Usuários</Link>
                <Link className="link-header" to="/Tipoevento">Contatos</Link> 

                <Link to="/Login"><button className="logar" style={{display:props.botaozinho}}>Logar</button></Link>

            </nav>
            <nav className="navas_header" style={{display:props.naver}}>
            
                {/* // <Link className="link-header" to="/Cadastroevento">{props.namaewa}</Link> */}

                <Link className="link-header" to="/Cadastroevento">{props.nomeUsuario}</Link>
                <img src={Portinha} alt=""/>
                {/* <a href="" className="link-header">{props.namaewa}</a> */}
            </nav>
            </div>
        </header>
    )
}
export default Header;