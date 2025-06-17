import { useEffect, useState } from "react";
//import de componentes
import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Listar from "../../components/listar/Listar";
//import de componentes
import api from "../../Services/services";
import Swal from "sweetalert2";

const TipoEvento = () => {
    //Constantes
    const [tipoDeEvento, setTipoDeEvento] = useState("")
    const [listaTipoEvento, setListarTipoEvento] = useState([])

    //Alertas
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

    //Funções
    async function cadastrarEvento(evt) {
        evt.preventDefault();
        if (tipoDeEvento.trim() != "") {
            try {
                await api.post("tipoEvento", { TituloTipoEvento: tipoDeEvento });
                setTipoDeEvento("");
                alertar("success","Cadastrado com sucesso")
                console.log();
                
            } catch (error) {
                console.log(error);

                alertar("error","Erro! Entre em contato com o suporte")
            }
        } else {
            alertar("error","Erro! Entre em contato com o suporte")
        }

    };

    async function listarTipoEvento() {
        try {
            const resposta = await api.get("tipoEvento")
            setListarTipoEvento(resposta.data)
        } catch (error) {
            console.log(error);

        }
    }

    async function excluirTipoEvento(TipoEventoID) {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Você tem certeza?",
            text: "Esta ação é irreversivel!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, deleta ae!",
            cancelButtonText: "Não, deleta não man",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.delete(`tipoEvento/${TipoEventoID}`)
                    listarTipoEvento();
                } catch (error) {
                    console.log(error);

                }
                swalWithBootstrapButtons.fire({
                    title: "Deletado!",
                    text: "TipoEvento deletado com sucesso",
                    icon: "success"
                })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "Seu TipoEvento imaginario está a salvo :)",
                    icon: "error"
                });
            }
        });

    }

    async function editarTipoEvento(tipoEvento) {
        const { value: novoTipoEvento } = await Swal.fire({
            title: "Insira o novo nome do Tipo Evento",
            input: "text",
            inputLabel: "Novo nome do TipoEvento:",
            //através do input value, faremos com que o input ja venha preenchido com o gênero que queremos editar
            inputValue: tipoEvento.nome,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "Você tem que escrever alguma coisa! >:(";
                }
            }
        });
        if (novoTipoEvento) {
             try {
                 await api.put(`tipoEvento/${tipoEvento.tipoEventoID}`,{TituloTipoEvento : novoTipoEvento});
                 Swal.fire(`Seu gênero agora é: ${novoTipoEvento}`);
             } catch (error) {
                console.log(error);
                
             }
            
        }
    }

    useEffect(() => {
        listarTipoEvento();
    }, [listaTipoEvento])


    return (
        <>
            <Header
                nomeUsuario="Administrador"
                botaozinho="none"
            />
            <Cadastro
                tituloCadastro="Cadastro de Tipo Evento"
                visibilidade="none"
                taveno="none"
                toveno="none"

                funcCadastro={cadastrarEvento}
                valorInput={tipoDeEvento}
                setValorInput={setTipoDeEvento}

                placeholder = "Tipo Evento"
            />
            <Listar
                tituloLista="Lista de Tipos Eventos"
                nomezin="Tipo Eventos"
                visible="none"
                edit="Editar"

                delet={excluirTipoEvento}
                editar={editarTipoEvento}
                tipoLista="tipoEvento"
                lista={listaTipoEvento}
            />
            <Footer />
        </>
    )
}
export default TipoEvento;