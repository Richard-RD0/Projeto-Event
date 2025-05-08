import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header";
import Cadastro from "../../components/cadastro/Cadastro"

import Banner from "../../assents/img/banner_cadastroUsuario.png"
import Lista from "../../components/lista/Lista";
const CadastroUsuario = () => {
    return (
        <>
            <Header/>
                <Cadastro
                tituloCadastro = "Cadastro Tipo de Usuário"
                img_banner = {Banner}
                nomes = "Título"
                visibilidade ="none"
                
                />
                <Lista 
                   tituloLista ="Lista Tipo de Evento"
                   titulo = "titulo"
                   visibilidade ="none"
                   />
            <Footer/>
        </>
    )
}

export default CadastroUsuario;