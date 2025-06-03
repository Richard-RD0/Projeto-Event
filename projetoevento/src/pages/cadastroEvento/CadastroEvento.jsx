import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import imgum from "../../assets/img/cadastroDeEvento.png"
import { useEffect, useState } from "react";
import api from "../../Services/Services";

import Swal from 'sweetalert2';
import { data } from "react-router-dom";

const CadastroEvento = () => {

    const [evento, setEvento] = useState("");
    const [tipoEvento, setTipoEvento] = useState("");
    const [listaTipoEvento, setListaTipoEvento] = useState([]);
    const [listaEvento, setListaEvento] = useState([]);
    const [data, setData] = useState([]);
    const [listaData, setListaData] = useState([]);
    const [instituicao, setInstituicao] = useState("8ECDAE79-58D6-462D-905B-8358F92387F5");
    const [listaInstituicao, setListaInstituicao] = useState([]);
    const [descricao, setDescricao] = useState([]);

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


    async function listarInstituicao() {
        try {
            const resposta = await api.get("Instituicao");
            setListaInstituicao(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function listarTipoEvento() {
        try {
            const resposta = await api.get("tiposEventos");
            setListaTipoEvento(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function listarEvento() {
        try {
            const resposta = await api.get("Evento");
            setListaEvento(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function listarInstituicao() {
        try {
            const resposta = await api.get("Instituicao");
            setListaInstituicao(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }


    async function cadastrarEvento(e) {
        e.preventDefault();
        if (evento.trim() !== "") {
            try {
                await api.post("eventos", { nomeEvento: evento, idTipoEvento: tipoEvento, dataEvento: data, descricao: descricao, idInstituicao: instituicao });
                alertar("success", "cadastroooooooooooooo");
                setEvento("");
                setTipoEvento("");
                setDescricao("");
                setData("");
            } catch (error) {
                alertar("error", "Tente Novamente.")
            }
        } else {
            alertar("error", "Preecha os campos vazios!")
        }
    }

    // excluir 
    async function excluirEvento(EventoId) {
        try {
            await api.delete(`Eventos/${EventoId.idEvento}`);
            alertar("success", "Evento deletado com sucesso!");
        } catch (error) {
            alertar("error", "Não foi possível deletar esse evento!");
        }
    }



    async function descricaoEvento(evento) {
        await Swal.fire({
            title: evento.nomeEvento,
            text: evento.descricao,
            icon: 'info',
            showClass: {
                popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
            `
            },
            hideClass: {
                popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
            `
            },
            confirmButtonText: 'Fechar'
        });
    }


    // editar
    async function editarEvento(Evento) {
        const { value: novoEvento } = await Swal.fire({
            title: "Modifique o Evento!",
            input: "text",
            inputLabel: "Novo Evento",
            inputValue: Evento.nomeEvento,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "O campo não pode estar vazio!";
                }
            }
        });
        if (novoEvento) {
            try {
                console.log(Evento.nomeEvento);
                console.log(novoEvento);

                await api.put(`Eventos/${Evento.idEvento}`, { nomeEvento: novoEvento });
                Swal.fire(`Tipo de Evento modificado para ${novoEvento}!`);
            } catch (error) {
                console.log(error);
            }
        }
    }
    useEffect(() => {
        listarTipoEvento();
        listarEvento();
        listarInstituicao();
    }, [listaEvento]);

    return (
        <>
            <Header
                visibilBotao="none"
                admHeader="Administrador"
            />
            <main>
                <Cadastro
                    tituloCadastro="Cadastro de Eventos"
                    botaoNome="Nome"

                    lista={listaTipoEvento}

                    funcCadastro={cadastrarEvento}


                    valorInput={evento}
                    setValorInput={setEvento}

                    valorSelectInstituicao={instituicao}
                    setValorSelectInstituicao={setInstituicao}

                    valorText={descricao}
                    setValorText={setDescricao}

                    valorDate={data}
                    setValorDate={setData}

                    valorSelect={tipoEvento}
                    setValorSelect={setTipoEvento}

                    img={imgum}

                />

                <Lista
                    titulo="Lista de eventos"
                    tituloEvento="Nome"
                    tabelaNome="Nome Evento"

                    tipoLista="eventos"
                    lista={listaEvento}

                    descricao={descricaoEvento}
                    funcExcluir={excluirEvento}
                    funcEditar={editarEvento}
                />

            </main>
            <Footer />
        </>
    )
}

export default CadastroEvento;