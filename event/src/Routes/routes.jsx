import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import TipoEvento from "../pages/cadastroTipoEvento/TipoEvento";
import EventosListar from "../pages/cadastroEvento/EventosListar";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import TipoUsuario from "../pages/cadastroTipoUsuario/TipoUsuario";
import Evento from "../pages/evento/Evento";

const Privado = (props) => {
    const {usuario} = useAuth();
    //token, idUsuario, tipoUsuario

    // Se nao estiver authenticado, mada para login
    // if (!usuario) {
    //    return <Navigate to="/" />; 
    // }

    // // Se o tipo do usuario nao for o permitido, bloqueia
    // if(usuario.tipoUsuario !== props.tipoPermitido) {
    // // ir para a tela de nao encontrado!
    // return <Navigate to="/" />;
    // }

    // Senao, renderiza o componente passado
    return <props.item />;
}


const Rotas = () => {
    return(
        <BrowserRouter >
        <Routes>
            <Route path="/" element={<Login />} exact/>
            <Route path="/Cadastroevento" element={<Privado tipoPermitido="Aluno" item={Evento}/>} />
            <Route path="/Evento" element={< Privado tipoPermitido="Admin" item={EventosListar}/>} />
            <Route path="/Tipoevento" element={<Privado tipoPermitido="Admin" item={TipoEvento}/>} />
            <Route path="/Tipousuario" element={<Privado tipoPermitido="Admin" item={TipoUsuario}/>} />
        </Routes>
        </BrowserRouter>
    )
}
export default Rotas;