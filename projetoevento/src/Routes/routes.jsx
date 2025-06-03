// src/routes/Rotas.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import CadastroUsuario from "../pages/cadastroUsuario/CadastroUsuario";
import CadastroEvento from "../pages/cadastroEvento/CadastroEvento";
import ListagemEvento from "../pages/listagemEvento/ListagemEvento";
import TipoUsuarios from "../pages/tipoUsuarios/TipoUsuarios";
import TipoEventos from "../pages/tipoEventos/TipoEventos";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/ListagemEvento" element={<ListagemEvento />} />
                <Route path="/CadastroUsuario" element={<CadastroUsuario />} />
                <Route path="/CadastroEvento" element={<CadastroEvento />} />
                <Route path="/TipoEvento" element={<TipoEventos />} />
                <Route path="/TipoUsuario" element={<TipoUsuarios />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Rotas;