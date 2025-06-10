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
import Modal from "../../components/modal/Modal";
import Swal from "sweetalert2";


const ListagemDeEvento = () => {

    const [listaEvento, setListaEvento] = useState([]);
    const [tipoModal, seTipoModal] = useState("");
    //"descricaoEvento" ou "Comentario"
    const [dadosModal, setDadosModal] = useState({});
    //descrição, idEvento, etc.
    const [modalAberto, setModalAberto] = useState(false);

    const [usuarioId, setUsuarioId] = useState("91444B5C-A2C0-4AA3-B866-FCC6D508B6C8");

    //filtro data
    const [filtroData, setFiltroData] = useState(["todos"]);

    // const [valorSelectEvento, setvalorSelectEvento] = useState("");


    async function listarEvento() {
        try {
            const eventoBuscado = await api.get("Eventos");
            const todosOsEventos = eventoBuscado.data;

            const respostaPresenca = await api.get ("PresencasEventos/ListarMinhas/"+usuarioId);
            const minhasPresencas = respostaPresenca.data;

            const eventosComPresencas = todosOsEventos.map((atualEvento) => {
                const presenca = minhasPresencas.find(p => p.idEvento === atualEvento.idEvento)

                return{
                    //AS INFORMACOES TANTO DE EVENTOS QUANTO DE EVENTOS QUE POSSUEM PRESENCA
                    ...atualEvento, //mantem os dados originais do evento atual
                    possuiPresenca: presenca?.situacao === true,
                    idPresenca: presenca?.idPresencaEvento || null  
                }

                
                
                
            })
            
            setListaEvento(eventosComPresencas);
            console.log(`Todos os Eventos com presencas:`);
            console.log(eventosComPresencas);

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        listarEvento();
    }, []);

    function abrirModal(tipo, dados) {
        //tipo de modal
        //os dados do meu modal
        setModalAberto(true);
        seTipoModal(tipo);
        setDadosModal(dados);
    }

    function fecharModal() {
        setModalAberto(false);
        setDadosModal({});
        seTipoModal("");
    }

    async function manipularPresenca(idEvento, presenca, idPresenca) {
        try {
            console.log("aaaaaaa");
            
            if (presenca && idPresenca !== "") {
                //atualizacao: para FALSE
                await api.put(`PresencasEventos/${idPresenca}`,{situacao: false});
                Swal.fire('Removido', 'Sua presença foi removida.', 'success');
            } else if (idPresenca !== ""){
                //atualizacao: situacao TRUE
                await api.put(`PresencasEventos/${idPresenca}`, {situacao: true});
                Swal.fire('Confirmado!', 'Sua presença foi confirmada.', 'success');
            }else{
                //cadastrar uma nova presenca
                await api.post("PresencasEventos", {situacao: true, idUsuario: usuarioId, idEvento: idEvento });
                Swal.fire('Confirmado!', 'Sua presenca foi confirmada.', 'success');
            }

            listarEvento(); 

        } catch (error) {
            console.log(error);
            
        }
    }

    function filtrarEventos() {
        //define a data de hoje
        const hoje = new Date();

        return listaEvento.filter(evento => {
            const dataevento = new Date(evento.dataevento);

            if (filtroData.includes("todos")) return true; 
            if (filtroData.includes("futuros") && dataevento > hoje)
            return true; 
        if (filtroData.includes("passados") && dataevento < hoje) 
            return true;

            return false;
        });

        
    }


    return (
        <>
            <Header
                tituloHeader="Aluno"
            />
            <main>
                <section className="layout_grid lista_eventos">
                    <h1>Eventos</h1>
                    <hr />

                    <div className="tabelas">
                        {/* Select dentro: value={valorSelectEvento} onChange={(e) => setvalorSelectEvento(e.target.value)} */}
                        <select name="Tipo De Evento" id="" className="select" onChange={(e) => setFiltroData([e.target.value]) }>
                            <option value="todos" selected> Todos os Evento </option>
                            <option value="futuros">Somente futuros</option>
                            <option value="passados">Somente passados</option>

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
                                {filtrarEventos() && filtrarEventos().map((item) => (
                                    <tr className="itens">
                                        <td data-cell="Titulo">{item.nomeEvento}</td>
                                        <td data-cell="Data">{item.dataEvento ? format(new Date(item.dataEvento), "dd/MM/yyyy", { locale: ptBR }) : ""}
                                        </td>
                                        <td data-cell="Nome">{item.tiposEvento?.tituloTipoEvento}</td>
                                        <td data-cell="Descrição"> <button className="icon" onClick={() => abrirModal("descricaoEvento", { descricao: item.descricao })}>
                                            <img src={Informacoes} alt="" />
                                        </button>
                                        </td>
                                        <td data-cell="Comentario"><button className="icon" onClick={() => abrirModal("Comentarios", { idEvento: item.idEvento })}>
                                            <img src={Comentario} alt="" />
                                        </button>
                                        </td>
                                        <td data-cell="Participar">
                                            <Toggle presenca={item.possuiPresenca} 
                                            metodo = {() => manipularPresenca(item.idEvento, item.presenca, item.idPresenca)}/>
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>

            <Footer />

            {modalAberto && (
                <Modal
                    titulomodal={tipoModal === "descricaoEvento" ? "Descrição do Evento" : "Comentário"}

                    //estou verificando o meu tipo modal!
                    tipoModel = {tipoModal}

                    idEvento = {dadosModal.idEvento}

                    descricao = {dadosModal.descricao}

                    fecharmodal = {fecharModal}
                />

            )}

        </>

    )
}
export default ListagemDeEvento;

//Atalho para criar componente -> rafce 