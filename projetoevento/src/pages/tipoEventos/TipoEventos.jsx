import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import imgum from "../../assets/img/tipoUsuario.png"
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from '../../Services/Services';

const CadastroTipoEvento = () => {

    // nome do tipoEvento
    const [tipoEvento, setTipoEvento] = useState("");
    const [listaTipoEvento, setListaTipoEvento] = useState([]);

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
    async function cadastrarTipoEvento(e) {
        e.preventDefault();
        if (tipoEvento.trim() != "") {
            try {
                await api.post("tiposEventos", { tituloTipoEvento: tipoEvento });
                alertar("success", "Cadastro realizado com sucesso!")
                setTipoEvento("");
            } catch (error) {
                alertar("error", "Erro! Entre em contato com o suporte.");
            }
        } else {
            alertar("error", "O campo precisa estar preenchido!");
        }
    }

    // listar
    async function listarTipoEvento() {
        try {
            //await => Aguarda uma resp da solicitação
            const resposta = await api.get("tiposEventos");
            // console.log(resposta);
            setListaTipoEvento(resposta.data);
            console.log(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect
    useEffect(() => {
        listarTipoEvento();
    }, [listaTipoEvento])

    // excluir 
    async function excluirTipoEvento(TipoEventoId) {
        try {
            await api.delete(`tiposEventos/${TipoEventoId.idTipoEvento}`);
            alertar("success", "Tipo de evento deletado com sucesso!");
        } catch (error) {
            alertar("error", "Não foi possível deletar este tipo de evento!");
        }
    }

    // editar
    async function editarTipoEvento(tipoEvento) {
        const { value: novoTipoEvento } = await Swal.fire({
            title: "Modifique o Tipo de Evento!",
            input: "text",
            inputLabel: "Novo Tipo de Evento",
            inputValue: tipoEvento.tituloTipoEvento,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "O campo não pode estar vazio!";
                }
            }
        });
        if (novoTipoEvento) {
            try {
                console.log(tipoEvento.tituloTipoEvento);
                console.log(novoTipoEvento);

                await api.put(`tiposEventos/${tipoEvento.idTipoEvento}`, { tituloTipoEvento: novoTipoEvento });
                Swal.fire(`Tipo de Evento modificado para ${novoTipoEvento}!`);
            } catch (error) {
                console.log(error);
            }
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
                    tituloCadastro="Cadastro Tipo de Eventos"
                    botaoNome="Título"
                    visibilidade="none"
                    data="none"

                    img={imgum}

                    funcCadastro={cadastrarTipoEvento}
                    valorInput={tipoEvento}
                    setValorInput={setTipoEvento}

                />

                <Lista
                    titulo="Lista tipo de eventos"
                    tituloEvento="Título"
                    visibilEvento="none"
                    visibilidade="none"

                    tipoLista="tiposEventos"
                    lista={listaTipoEvento}
                    funcExcluir={excluirTipoEvento}
                    funcEditar={editarTipoEvento}


                />

            </main>
            <Footer />
        </>
    )
}

export default CadastroTipoEvento;