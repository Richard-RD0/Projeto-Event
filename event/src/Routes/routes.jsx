import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import CadastroEvento from "../pages/cadastroEventos/CadastroEvento";
import CadastroTipoEvento from "../pages/cadastroTipoEvento/CadastroTipoEvento"
import CadastroTipoUsuario from "../pages/cadastroTipoUsuario/CadastroTipoUsuario"
import ListagemDeEvento from "../pages/listagemDeEvento/ListagemDeEvento"

const Rotas = () => {
    return (
        <BrowserRouter>
        <Routes>

            <Route path="/" element={<Login/>}/>
            <Route path="/Cadastro" element={<CadastroEvento/>}/>
            <Route path="/CadastrarTipoEvento" element={<CadastroTipoEvento/>}/>
            <Route path="/CadastrarTipoUsuario" element={<CadastroTipoUsuario/>}/>
            <Route path="/ListarEventos" element={<ListagemDeEvento/>}/>

        </Routes>
        </BrowserRouter>
    )
}
export default Rotas;