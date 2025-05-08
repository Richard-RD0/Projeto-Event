import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import TipoEvento from "../pages/tipoDeEvento/TipoEvento";

const Rotas = () => {
    return (

        <BrowserRouter>
            <Routes>
                {/* http://localhost:3000/ => Login */}
                <Route path="/" element={<Login />} exact />
                
                <Route path="/tipoevento" element={<TipoEvento />} exact />


            </Routes>
        </BrowserRouter>
    )
}
export default Rotas;