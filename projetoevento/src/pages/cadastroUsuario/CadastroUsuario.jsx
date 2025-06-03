import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../Services/Services";
import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Lista from "../../components/lista/Lista";
import Imagem from "../../assets/img/tipoUsuario.png"

const CadastroTipoUsuario = () => {
    const [TiposUsuarios, setTipoUsuario] = useState("");
    const [listaTipoUsuario, setListaTipoUsuario] = useState([]);

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
            },
        });
        Toast.fire({ icon: icone, title: mensagem });
    }

    async function cadastrarTU(evt) {
        evt.preventDefault();
        if (TiposUsuarios.trim() !== "") {
            try {
                await api.post("TiposUsuarios", {
                    tituloTipoUsuario: TiposUsuarios,
                });
                alertar("success", "Cadastro realizado com sucesso! 🎉");
                setTipoUsuario(""); // limpa o campo
                listarTiposUsuarios(); // atualiza a lista
            } catch (error) {
                alertar("error", "ERRO: Entre em contato com o suporte! 🤖");
                console.log(error);
            }
        } else {
            alertar("warning", "Preencha o campo antes de cadastrar! ⚠️");
        }
    }

    async function listarTiposUsuarios() {
        try {
            const resposta = await api.get("TiposUsuarios");
            setListaTipoUsuario(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function deletarTipoUsuario(tipoUsuarioId) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: true,
        });

        swalWithBootstrapButtons
            .fire({
                title: "Você tem certeza?",
                text: "Não será possível reverter!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sim",
                cancelButtonText: "Não",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await api.delete(
                            `TiposUsuarios/${tipoUsuarioId.idTipoUsuario}`
                        );
                        alertar("success", "Tipo de usuário deletado com sucesso! 💣");
                        swalWithBootstrapButtons.fire({
                            title: "Deletado!",
                            text: "O tipo de usuário foi deletado.",
                            icon: "success",
                        });
                        listarTiposUsuarios();
                    } catch (error) {
                        alertar("error", "ERRO: Entre em contato com o suporte! 🤖");
                        console.log(error);
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire({
                        title: "Cancelado",
                        text: "O tipo de usuário não foi deletado",
                        icon: "error",
                    });
                }
            });
    }

    async function editarTipoUsuario(idTipoUsuario) {
        const { value: novoTipoUsuario } = await Swal.fire({
            title: "Modifique o tipo de usuário",
            input: "text",
            inputLabel: "Novo tipo",
            inputValue: idTipoUsuario.tituloTipoUsuario,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "O campo não pode estar vazio!";
                }
            },
        });

        if (novoTipoUsuario) {
            try {
                await api.put(`TiposUsuarios/${idTipoUsuario.idTipoUsuario}`, {
                    tituloTipoUsuario: novoTipoUsuario,
                });
                Swal.fire(`O tipo de usuário foi modificado para: ${novoTipoUsuario}`);
                listarTiposUsuarios();
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        listarTiposUsuarios();
    }, []);

    return (
        <>
            <Header />
            <main>
                <Cadastro
                    placeholder="Nome"
                    visibilidade="none"
                    titulo_cadastro="Cadastro de Usuário"
                    imagem={Imagem}
                    funcCadastro={cadastrarTU}
                    setValorInput={setTipoUsuario}
                    inputValor={TiposUsuarios}
                />
                <Lista
                    titulo_lista="Lista de Usuário"
                    lista={listaTipoUsuario}
                    visiAlternativa="none"
                    visiComentario="none"
                    tipoLista="TiposUsuarios"
                    funcExcluir={deletarTipoUsuario}
                    funcEditar={editarTipoUsuario}
                />
            </main>
            <Footer />
        </>
    );
}

export default CadastroTipoUsuario;