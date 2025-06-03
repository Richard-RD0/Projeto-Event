import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Toggle from "../../components/toggle/Toggle";
import { useEffect, useState } from "react";
import "./ListagemDeEvento.css";
import Comentario from "../../assets/img/Vector (3).png";
import Informacoes from "../../assets/img/informacoes (1) 1.png";
import api from '../../Services/services';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale'; 

const ListagemDeEvento = () => {
    
    const [listaEvento, setListaEvento] = useState([]);
    const [valorSelectEvento, setvalorSelectEvento] = useState("");


    async function listarEvento(){
        try {
            const eventoBuscado = await api.get("Eventos");
            console.log(eventoBuscado);
            setListaEvento(eventoBuscado.data);
            
        } catch (error) {
            console.log(error);
            
        }   
    }

    useEffect(() => {
        listarEvento();
    }, []);




    return(
        <>
        <Header
            tituloHeader = "Aluno"
        />
        <main>
         <section className="layout_grid lista_eventos">
                <h1>Eventos</h1>
                <hr />

            <div className="tabelas">
                <select name="Tipo De Evento" id="" className="select" value={valorSelectEvento} onChange={(e) => setvalorSelectEvento(e.target.value)}>
                    <option value="" disabled> Evento  </option>
                    {listaEvento.map((item) => (
                        <option value={item.idEvento}>{item.nomeEvento}</option>
                    ))}
                    
                </select>

                <table>
                <thead>
                    <tr className="cabecalhos">
                        <th>Titulo</th>
                        <th>Data do evento</th>
                        <th>Tipo Evento</th>
                        <th>Descrição</th>
                        <th>Comentarios</th>
                        <th>Participar</th>
                    </tr>
                </thead>
                <tbody>
                    {listaEvento.map((item) => (
                    <tr className="itens">
                        <td data-cell="Titulo">{item.nomeEvento}</td>
                        <td data-cell="Data">{item.dataEvento ? format(new Date(item.dataEvento), "dd/MM/yyyy", {locale: ptBR}) : ""}
                        </td>
                        <td data-cell="Nome">{item.tiposEvento?.tituloTipoEvento}</td>
                        <td data-cell="Descrição"><img src={Informacoes} alt="" /></td>
                        <td data-cell="Comentar"><img src={Comentario} alt="" /></td>
                        <td data-cell="Participar"><Toggle/></td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </section>



</main>

        <Footer/>
        </>
    )
}
export default ListagemDeEvento;