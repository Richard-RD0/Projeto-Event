//imports de componentes
import Cadastro from "../../components/cadastro/Cadastro";
import Header from "../../components/header/Header";
import Listar from "../../components/listar/Listar";
import Footer from "../../components/footer/Footer";
//imports de componentes
import Swal from "sweetalert2";
import api from "../../Services/services";
import { useEffect, useState } from "react";

const TipoUsuario = () => {
    //Constantes
    const [tipoDeUsuario, setTipoDeUsuario] = useState("")
    const [listaTipoUsuario, setListarTipoUsuario] = useState([])

    //alertas
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
    async function listarTipoUsuario() {
        try {
            const resposta = await api.get("tipoUsuario")
            setListarTipoUsuario(resposta.data)
        } catch (error) {
            console.log(error);

        }
    }

    async function cadastrarTipoUsuario(evt) {
        evt.preventDefault();
        if (tipoDeUsuario.trim() != "") {
            try {
                await api.post("tipoUsuario", { TituloTipoUsuario: tipoDeUsuario });
                setTipoDeUsuario("")
                console.log("entrou no cadastro");
                
                alertar("success", "Cadastrado com sucesso")
            } catch (error) {
                console.log(error);
                alertar("error", "Erro, entre em contato com o suporte")

            }
        } else {
            alertar("error", "Error, entre em contato com o suporte")
        }
    }

    async function excluirTipoUsuario(TipoUsuarioID) {

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
                    await api.delete(`tipoUsuario/${TipoUsuarioID}`)
                    listarTipoUsuario();
                } catch (error) {
                    console.log(error);

                }

                swalWithBootstrapButtons.fire({
                    title: "Deletado!",
                    text: "TipoUsuario deletado com sucesso",
                    icon: "success"
                })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "Seu TipoUsuario imaginario está a salvo :)",
                    icon: "error"
                });
            }
        });
    }

    async function editarTipoUsuario(tipoUsuario) {
        const { value: novoTipoUsuario } = await Swal.fire({
            title: "Insira o novo nome do Tipo Usuario",
            input: "text",
            inputLabel: "Novo nome do TipoUsuario:",
            //através do input value, faremos com que o input ja venha preenchido com o gênero que queremos editar
            inputValue: tipoUsuario.nome,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "Você tem que escrever alguma coisa! >:(";
                }
            }
        });
        if (novoTipoUsuario) {
            try {
                await api.put(`tipoUsuario/${tipoUsuario.tipoUsuarioID}`, { TituloTipoUsuario: novoTipoUsuario });
                console.log("entrou no editar");
                
                Swal.fire(`Seu TipoUsuario é: ${novoTipoUsuario}`);
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        listarTipoUsuario();
    }, [listaTipoUsuario])

    return (
        <>
            <Header
                nomeUsuario="Administrador"
                botaozinho="none"
            />
            <Cadastro
                tituloCadastro="Cadastro de Tipo Usuario"
                visibilidade="none"
                toveno="none"
                tovenono="none"

                funcCadastro={cadastrarTipoUsuario}
                valorInput={tipoDeUsuario}
                setValorInput={setTipoDeUsuario}

                placeholder = "Tipo Usuario"
            />
            <Listar
                tituloLista="Lista de Tipos Usuarios"
                nomezin="Tipo Usuarios"
                visible="none"
                edit="Editar"

                editar={editarTipoUsuario}
                delet={excluirTipoUsuario}
                tipoLista="tipoUsuario"
                lista={listaTipoUsuario}
            />
            <Footer />
        </>
    )

}
export default TipoUsuario;