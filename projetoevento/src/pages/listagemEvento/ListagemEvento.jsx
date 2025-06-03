import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Comentario from "../../assets/img/balao.png"
import Descricao from "../../assets/img/descricao2.png"
import Toggle from "../../components/toggle/Toggle";
import { useEffect, useState } from "react";
import api from '../../Services/Services';
import Swal from 'sweetalert2';
import Lista from "../../components/lista/Lista";



const ListagemEventos = (props) => {

    const [evento, setEvento] = useState("");
    const [listaEvento, setListaEvento] = useState([]);


    async function listarEvento() {
        try {
            const resposta = await api.get("Evento");
            setListaEvento(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <>
            <Header nomeUsu="Aluno"
                visibilBotao="none"
                admHeader="Administrador"
            />
            <section className="layout_grid listagem_evento">
                <h1>Eventos</h1>
                <hr />
                <div className="tabela_evento">
                    <select name="Todos os Eventos" id="" className="select_evento">
                        <option value="" disabled>Todos os Eventos</option>
                        <option value="op 1" disabled selected>op 1</option>
                        <option value="op 2" disabled selected>op 2</option>
                        <option value="op 3" disabled selected>op 3</option>
                        <option value="op 4" disabled selected>op 4</option>



                    </select>
                    <thead>
                        <tr className="table_evento">
                            <th>Titulo</th>
                            <th>Data Evento</th>
                            <th>Tipo Evento</th>
                            <th>Descrição</th>
                            <th>Comentários</th>
                            <th>Participar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="item_evento">
                            <td data-cell="Nome" >Nome Evento</td>
                            <td data-cell="Nome" >Data Evento</td>
                            <td data-cell="Evento">Tipo Evento</td>
                            <td data-cell="Descrição"><img src={Descricao} alt="Imagem de uma informação" /></td>
                            <td data-cell="Comentar"><img src={Comentario} alt="Imagem de um comentario" /></td>
                            <td data-cell="Botao"><Toggle /></td>
                        </tr>
                    </tbody>
                </div>
            </section>


            <Footer />
        </>
    )
}

export default ListagemEventos;