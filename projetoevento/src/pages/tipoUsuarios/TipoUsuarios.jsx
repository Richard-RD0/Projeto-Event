import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import imgdois from "../../assets/img/tipoUsuario.png"
import { useEffect, useState } from "react";
import api from '../../Services/Services';


import Swal from "sweetalert2";

const CadastroTipoUsuario = () => {

  
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [listaTipoUsuario, setListaTipoUsuario] = useState([]);


    // alerta
    function alertar(icone, mensagem) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: icone,
            title: mensagem
        });
    }

    // cadastrar
    async function cadastrarTipoUsuario(e) {
        e.preventDefault();
        if (tipoUsuario.trim() != "") {
            try {
                await api.post("tiposUsuarios", { tituloTipoUsuario: tipoUsuario });
                alertar("success", "Cadastro realizado com sucesso!")
                setTipoUsuario("");
            } catch (error) {
                alertar("error", "Erro! Entre em contato com o suporte.");
            }
        } else {
            alertar("error", "O campo precisa estar preenchido!");
        }
    }

    // listar
    async function listarTipoUsuario() {
        try {
            const resposta = await api.get("tiposUsuarios");
            setListaTipoUsuario(resposta.data);
            console.log(resposta.data);

        } catch (error) {
            console.log(error);
        }
    }

    // useEffect
    useEffect(() => {
        listarTipoUsuario();
    }, [listaTipoUsuario])


    // excluir 
    async function excluirTipoUsuario(TipoUsuarioId) {
        try {
            await api.delete(`tiposUsuarios/${TipoUsuarioId.idTipoUsuario}`);
            alertar("success", "Tipo de usuário deletado com sucesso!");
        } catch (error) {
            alertar("error", "Não foi possível deletar este tipo de usuário!");
        }
    }

    return (
        <>
            <Header
                visibilBotao="none"
                admHeader="Administrador"
            />
            <main>
                <Cadastro
                    tituloCadastro="Cadastro Tipo de Usuário"
                    botaoNome="Título"
                    visibilidade="none"
                    data="none"

                    img={imgdois}

                    funcCadastro={cadastrarTipoUsuario}
                    valorInput={tipoUsuario}
                    setValorInput={setTipoUsuario}

                />
                <Lista
                    titulo="Lista tipo de Usuário"
                    tituloEvento="Título"
                    tabelaNome="Tipo Usuário"
                    visibilEvento="none"
                    visibilidade="none"

                    lista={listaTipoUsuario}
                    funcExcluir={excluirTipoUsuario}
                />
            </main>
            <Footer />
        </>
    )
}

export default CadastroTipoUsuario;