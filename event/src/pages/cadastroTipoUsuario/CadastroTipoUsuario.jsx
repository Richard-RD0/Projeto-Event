import Header from "../../components/header/Header";
import Cadastro from "../../components/cadastro/Cadastro";
import Banner from "../../assets/img/undraw_add_user_re_5oib 1.png";
import Lista from "../../components/lista/Lista";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import api from "../../Services/services";

const CadastroTipoUsuario = () => {

    const[tipousuario, setTipoUsuario] = useState("");
    const[listaTipoUsuario, setListaTipoUsuario] = useState([]);

    function alerta(icone, mensagem){
           
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

    async function cadastrarTipoUsuario(e){
        e.preventDefault();

    if (tipousuario.trim() !== "") {
        try {
            await api.post("TiposUsuarios", {tituloTipoUsuario: tipousuario});
            alerta( "success", "Cadastro realizado com sucesso!!");
            setTipoUsuario();
        } catch (error) {
            alerta( "Error! entre em contato com o suporte");
            console.log(error);
            
        }
    }

    }

    async function listarTipoUsuario(){
        try {
            const resposta = await api.get("TiposUsuarios");
            console.log(resposta.data);
            setListaTipoUsuario(resposta.data);
            
        } catch (error) {
            console.log(error);
            
        }
    }

    async function deletarTipoUsuario(id) {
        
        Swal.fire({
            title: "Voce tem certeza?",
            text: "voce apagará isso para sempre!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Não Deletar!",
            confirmButtonText: "Sim, Deletar isso!"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await api.delete(`TiposUsuarios/${id.idTipoUsuario}`);
                
            } catch (error) {
                console.log(error);
                
            }

        Swal.fire({
        title: "Deletado!!",
        text: "Um Tipo Usuario Foi Excluído.",
        icon: "success"
        });
    }
    listarTipoUsuario();   
    });
}
    async function editarTipoUsuario(tipousuario) {
         const{ value: novoTipoUsuario } = await Swal.fire({
                title: "Modifique o seu Tipo Usuario",
                input: "text",
                inputLabel: "Novo Tipo Usuario",
                inputValue: tipousuario.titulotipousuario,
            showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return "O campo precisa estar preenchido!!";
            }
        }
    });
        if (novoTipoUsuario) {
            try {
                // console.log(genero.nome);
                // console.log(novoGenero);
                
                api.put(`TiposUsuarios/${tipousuario.idTipoUsuario}`, {titulotipousuario: novoTipoUsuario});
                Swal.fire(`O tipo do evento foi modificado ${novoTipoUsuario}`);
                listaTipoUsuario();
            } catch (error) {
                console.log(error);
                
            }

    }
}


    useEffect(() => {
        listarTipoUsuario();
    },[listaTipoUsuario]);
   


    return(
        <>
        <Header
            tituloHeader = "Administrador"
        />
        <main>
        <Cadastro 
            tituloCadastro = "Cadastro Tipo De Usuario"
            banner_img = {Banner}
            campoPlaceholder = "Titulo"
            visibilidade = "none"
            NomeDoBotao = "Cadastrar"

            valorInput = {tipousuario}
            setValorInput = {setTipoUsuario}
            funcCadastro = {cadastrarTipoUsuario}

        />
        <Lista
            tituloLista = "Lista Tipo De Usuario"
            visibilidade= "none"
            titulo = "Titulo"
            
            lista = {listaTipoUsuario}

            deletar = {deletarTipoUsuario}

            funcEditar = {editarTipoUsuario}

            tipoLista = "TiposUsuarios"

            


        />
        </main>
        <Footer/> 

        </>


    )

}
export default CadastroTipoUsuario;