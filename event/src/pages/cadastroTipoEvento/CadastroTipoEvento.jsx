import Header from "../../components/header/Header";
import Cadastro from "../../components/cadastro/Cadastro";
import Banner from "../../assets/img/undraw_add_tasks_re_s5yj (1) 1.png";
import Lista from "../../components/lista/Lista";
import Footer from "../../components/footer/Footer";

import api from "../../Services/services"; 
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const CadastroTipoEvento = () => {

    const [tipoevento, setTipoEvento] = useState("");
    const [listaTipoEvento, setListaTipoEvento] = useState([]);

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

   async function cadastrarTipoEvento(evt) {
        evt.preventDefault();   

    if (tipoevento.trim() !== "") {
        
        try {
            await api.post("TiposEventos", {tituloTipoEvento: tipoevento});
            alerta("success", "Cadastro realizado com sucesso!");
            setTipoEvento("");

            listarTipoEvento();
        } catch (error) {
           alerta("error", "Erro! entre em contato com o suporte!");
            console.log(error);
            
        }
    }else {
        alert("Erro!! o campo precisa ser preenchido");
    }

    }

    async function listarTipoEvento(){
        try {
            const resposta = await api.get("TiposEventos");
            console.log(resposta);
            setListaTipoEvento(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }

     async function deletarTipoEvento(id) {

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
                await api.delete(`TiposEventos/${id.idTipoEvento}`);
                
            } catch (error) {
                console.log(error);
                
            }

        Swal.fire({
        title: "Deletado!!",
        text: "Um Tipo Evento Foi Excluído.",
        icon: "success"
        });
    }
    listarTipoEvento();   
    });
}


 async function editarTipoEvento (tipoevento) {
        // console.log(genero);
        const{ value: novoTipoEvento } = await Swal.fire({
                title: "Modifique o seu Gênero",
                input: "text",
                inputLabel: "Novo Tipo Evento",
                inputValue: tipoevento.titulotipoevento,
            showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return "O campo precisa estar preenchido!!";
            }
        }
    });
        if (novoTipoEvento) {
            try {
                // console.log(genero.nome);
                // console.log(novoGenero);
                
                api.put(`TiposEventos/${tipoevento.idTipoEvento}`, {titulotipoevento: novoTipoEvento});
                Swal.fire(`O tipo do evento foi modificado ${novoTipoEvento}`);
                listaTipoEvento();
            } catch (error) {
                console.log(error);
                
            }

}
}

    


useEffect(() => {
    listarTipoEvento();
}, [listaTipoEvento]);


    return(
        <>
        <Header
            tituloHeader = "Administrador"
        />
        <main>
        <Cadastro 
            tituloCadastro = "Cadastro Tipo De Evento"
            banner_img = {Banner}
            campoPlaceholder = "Titulo"
            visibilidade = "none"
            NomeDoBotao = "Cadastrar"
            valorInput = {tipoevento}   
            setValorInput = {setTipoEvento}
            funcCadastro = {cadastrarTipoEvento}    
        />
        <Lista
            tituloLista = "Lista Tipo De Eventos"
            visibilidade = "none"
            titulo = "Titulo"
            
            
            lista = {listaTipoEvento}

            deletar = {deletarTipoEvento}

            funcEditar = {editarTipoEvento}

            tipoLista = "TiposEventos"

        />
        </main>
        <Footer/> 

        </>


    )
}




export default CadastroTipoEvento;