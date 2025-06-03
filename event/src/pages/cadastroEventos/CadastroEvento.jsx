import Header from "../../components/header/Header";
import Cadastro from "../../components/cadastro/Cadastro";
import Banner from "../../assets/img/undraw_add_information_j2wg 1.png";
import Lista from "../../components/lista/Lista";
import Footer from "../../components/footer/Footer";

import { useEffect, useState } from "react";
import api from "../../Services/services";
import Swal from "sweetalert2";

const CadastroEvento = () => {

    const[evento, setEvento] = useState("");
    const[dataEvento, setDataevento] = useState("");
    const[descricao, setDescricao] = useState("");
    const[tiposevento, setTipoEvento] = useState("");
    const[instituicao, setInstituicao] = useState("6703C89E-ADAB-4FB2-93AD-3119235B3562");
    const[listaTipoEvento, setListaTipoEvento] = useState([]);
    const[listaEvento, setListaEvento] = useState([]);


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

     async function listarTipoEvento(){
        try {
            const resposta = await api.get("TiposEventos");
            // console.log(resposta);
            setListaTipoEvento(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function listarEvento(){
        try {
            const resposta = await api.get("Eventos");
            console.log(resposta.data);
            setListaEvento(resposta.data);
        } catch (error) {
            console.log(error);
            
        }
}

    async function cadastrarEvento(evt) {
        evt.preventDefault();

    if (evento.trim() !== "") {
        try {
            // console.log(evento);
            // console.log(tiposevento); 
            // console.log(dataEvento);
            // console.log(descricao);
            // console.log(instituicao);
            
            await api.post("Eventos", {nomeEvento: evento, idTipoEvento: tiposevento, dataEvento: dataEvento, descricao: descricao,
            idInstituicao: instituicao});
            alerta("success", "Evento cadastrado com sucesso!");
            setEvento("");
            setDataevento();
            setDescricao("");
            setTipoEvento("");
    
            
        } catch (error) {
            alerta("error", "Erro! entre em contato com o suporte!");
            console.log(error);
        }
    }else{
        alert("Erro!! o campo precisa estar preenchido!!")
    }
}

    async function deletarEvento(id) {

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
                await api.delete(`Eventos/${id.idEvento}`);
                
            } catch (error) {
                console.log(error);
                
            }

        Swal.fire({
        title: "Deletado!!",
        text: "Um Tipo Evento Foi Excluído.",
        icon: "success"
        });
    }
    listarEvento();   
    });
}

    async function editarEvento(evento) {
  try {
    const tiposOptions = listaTipoEvento
      .map(tipo => `<option value="${tipo.idTipoEvento}" ${tipo.idTipoEvento === evento.idTipoEvento ? 'selected' : ''}>${tipo.tituloTipoEvento}</option>`)
      .join('');

    const { value } = await Swal.fire({
      title: "Editar Tipo de Evento",
      html: `
        <input id="campo1" class="swal2-input" placeholder="Título" value="${evento.nomeEvento || ''}">
        <input id="campo2" class="swal2-input" type="date" value="${evento.dataEvento?.substring(0, 10) || ''}">
        <select id="campo3" class="swal2-select">${tiposOptions}</select>
        <input id="campo4" class="swal2-input" placeholder="Categoria" value="${evento.descricao || ''}">
      `,
      showCancelButton: true,
      confirmButtonText: "Salvar",
      cancelButtonText: "Cancelar",
      focusConfirm: false,
      preConfirm: () => {
        const campo1 = document.getElementById("campo1").value;
        const campo2 = document.getElementById("campo2").value;
        const campo3 = document.getElementById("campo3").value;
        const campo4 = document.getElementById("campo4").value;

        if (!campo1 || !campo2 || !campo3 || !campo4) {
          Swal.showValidationMessage("Preencha todos os campos.");
          return false;
        }

        return { campo1, campo2, campo3, campo4 };
      }
    });

    if (!value) {
      console.log("Edição cancelada pelo usuário.");
      return;
    }

    console.log("Dados para atualizar:", value);

    await api.put(`eventos/${evento.idEvento}`, {
      nomeEvento: value.campo1,
      dataEvento: value.campo2,
      idTipoEvento: value.campo3,  
      descricao: value.campo4,
    });

    console.log("Evento atualizado com sucesso!");
    Swal.fire("Atualizado!", "Dados salvos com sucesso.", "success");
    listarEvento();

  } catch (error) {
    console.log("Erro ao atualizar evento:", error);
    Swal.fire("Erro!", "Não foi possível atualizar.", "error");
  }
}

     async function descricaoEvento(evento) {
        try {
            Swal.fire({
            title: evento.nomeEvento,
            text: evento.descricao,
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
        }
});
        } catch (error) {
        }
    }


    useEffect(() => {
        listarTipoEvento();
        
    }, [listaEvento]);

     useEffect(() => {
        
        listarEvento();
    }, []);

    return(
        <>
        <Header
            tituloHeader = "Administrador"
        />
        <main>
        <Cadastro 
            tituloCadastro = "Cadastro De Eventos"
            banner_img = {Banner}
            campoPlaceholder = "Titulo"
            NomeDoBotao = "Cadastrar"
            
            funcCadastro={cadastrarEvento}

            valorInput={evento}
            setValorInput = {setEvento}

            ValorSelect = {tiposevento}
            setValorSelect = {setTipoEvento}

            valorSelect2 = {instituicao}
            setValorSelect2 = {setInstituicao}

            valorDate = {dataEvento}
            setValorDate={setDataevento}

            valorText={descricao}
            setValorText={setDescricao}

            lista={listaTipoEvento}
           
        />
        <Lista
            tituloLista = "Lista De Eventos"
            titulo = "Nome"

            lista = {listaEvento}

            funcEditar = {editarEvento}
            descricao = {descricaoEvento}
            tipoLista = "Eventos"

            deletar = {deletarEvento}

        />
        </main>
        <Footer/> 

        </>


    )
}
export default CadastroEvento;