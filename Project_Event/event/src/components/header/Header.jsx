import "./Header.css"
 import logo from "../../assets/img/logo.svg";
 const Header = () => {
     return (
         <header>
             <div className="layout_grid">
                 <Link to="/"> 
                 <img src={logo} alt="Logo do Event" />
                 </Link>
                 <nav className="nav_header"> 
                     <Link className = "link_header" to="/Home">Home</Link>
                     <Link className = "link_header" to="/Eventos">Eventos</Link>
                     <Link className = "link_header" to="/Usuarios">Usuários</Link>
                     <Link className = "link_header" to="/Contato">Contato</Link>
                     <Link className = "link_header" to="/Administrador">Adiministrador</Link>
                 </nav>
             </div>
         </header>
     )
 }

 export default Header;