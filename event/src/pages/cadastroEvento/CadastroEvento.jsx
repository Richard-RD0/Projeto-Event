import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header";
import Cadastro from "../../components/cadastro/Cadastro"
import Lista from "../../components/lista/Lista";

import Banner from "../../assents/img/banner_cadastroEvento.png"
const CadastroEvento = () => {
    return (
        <>
            <Header/>
                <Cadastro
                tituloCadastro = "Cadastro de Evento"
                img_banner = {Banner}
                nomes = "Nome"
                
                />

                <Lista 
                    tituloLista ="Lista de Evento"
                    titulo = "Nome"
                
                />
            <Footer/>
        </>
    )
}

export default CadastroEvento;