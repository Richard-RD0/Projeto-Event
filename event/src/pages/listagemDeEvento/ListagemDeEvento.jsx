import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Toggle from "../../components/toggle/Toggle";

import "./ListagemDeEvento.css";
import Comentario from "../../assets/img/Vector (3).png";

const ListagemDeEvento = () => {
    return(
        <>
        <Header
            tituloHeader = "Aluno"
        />
         <section className="layout_grid lista_eventos">
                <h1>Eventos</h1>
                <hr />

            <div className="tabelas">
                <select name="Tipo De Evento" id="" className="select">
                    <option value="">Todos Os Eventos</option>
                    <option value="">op1</option>
                    <option value="">op2</option>
                    <option value="">op3</option>
                </select>
                <thead>
                    <tr className="cabecalhos">
                        <th>Titulo</th>
                        <th>Tipo Evento</th>
                        <th>Comentarios</th>
                        <th>Participar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="itens">
                        <td>Nome Evento</td>
                        <td data-cell="Nome">Tipo Evento</td>
                        <td data-cell="Comentar"><img src={Comentario} alt="" /></td>
                        <td data-cell="Participar"><Toggle/></td>
                    </tr>
                    <tr className="itens">
                        <td>Nome Evento</td>
                        <td data-cell="Nome">Tipo Evento</td>
                        <td data-cell="Comentar"><img src={Comentario} alt="" /></td>
                        <td data-cell="Participar"><Toggle/></td>
                    </tr>
                </tbody>
            </div>
        </section>
        <Footer/>
        </>
    )
}
export default ListagemDeEvento;