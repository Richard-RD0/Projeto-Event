import React, { useEffect, useState } from 'react'
import ImgDeletar from "../../assets/img/Lixo.png"
import api from '../../Services/services'
import "./Modal.css"
import { set } from 'date-fns'

const Modal = (props) => {
  const [comentarios, setComentarios] = useState([]);

  const [usuarioID, setUsuarioID] = useState("8C36EDE7-4A87-4C21-AA32-B939795B1616");
  const [novoComentario, setNovoComentario] = useState("");


  async function listarComentarios() {
    try {
      const resposta = await api.get(`Feedback/ListarSomenteExibe?id=${props.eventoID}`);
      setComentarios(resposta.data);
    } catch (error) {
      console.log(error);

    }
  }

  async function cadastrarComentarios(comentario) {
    try {
      await api.post("Feedback",{
        usuarioId: usuarioID ,
        eventoId: props.eventoID,
        descricao: comentario
      })
      // setNovoComentario();

    } catch (error) {
      console.log(error);
      
    }
  }

  async function deletarComentario(feedbackID) {
    try {
      await api.delete(`feedback/${feedbackID}`)
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    listarComentarios();
  }, [comentarios])



  return (
    <>

      <div className="model-overlay" onClick={props.fecharModal}> </div>

      <div className="model">
        <h1>{props.titulo}</h1>
     
      <div className="model_conteudo">
        {props.tipoModel === "descricaoEvento" ? (
          <p>{props.descricao}</p>
        ) : (
          <>
            {comentarios.map((item) => (
              <div key={item.feedbackID}>
                <strong>
                  {item.usuario.nome}
                </strong>
                <img src={ImgDeletar} alt="delete"
                onClick={()=> deletarComentario(item.feedbackID)} />
                <p>{item.descricao}</p>
                <hr />
              </div>
            ))}
            <div>
              <input type="text" placeholder='Escreva seu comentário...' value={novoComentario} onChange={(e) => setNovoComentario(e.target.value)} />
              <button onClick={() => cadastrarComentarios(novoComentario)}>
                Cadastrar
              </button>
            </div>
          </>
        )} 
        </div>
      </div>

    </>

  )
}

export default Modal;
