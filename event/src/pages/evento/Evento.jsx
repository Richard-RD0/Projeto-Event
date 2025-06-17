import Header from "../../components/header/Header";
import Balao from "../../assets/img/balao.png"
import Footer from "../../components/footer/Footer";
import "./Evento.css";
// import Checkin from "../../components/checkin/Checkin"
import Descrito from "../../assets/img/informacoes.png"
import { useEffect, useState } from "react";
import Modal from "../../components/modal/Modal";
import api from "../../Services/services";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { useAuth } from "../../contexts/AuthContext";

const Evento = () => {

    const [listaEventos, setListaEventos] = useState([]);

    const [tipoModal, setTipoModal] = useState("");
    //descriçãoEventos ou "comentário"
    const [dadosModal, setDadosModal] = useState({});
    //descrição, eventoID, etc.
    const [modalAberto, setModalAberto] = useState(false);
    const {usuario} = useAuth();
    //id do usuario Data
    // const [usuarioID, setUsuarioID] = useState("")
    //filtro
    const [filtroData, setFiltroData] = useState(["todos"]);


    async function listarEventos() {
        try {
            //pega todos os eventos(Eventos em geral)
            const resposta = await api.get("evento");
            const todosOsEventos = resposta.data;

            const respostaPresenca = await api.get(`presenca/ListarMinhasPresencas/${usuario.usuarioID}`)//+
            const minhasPresencas = respostaPresenca.data;

            const eventosComPresenca = todosOsEventos.map((evento) => {
                const presenca = minhasPresencas.find(p => p.eventoID === evento.eventoID)
                return {
                    //AS INFORMACOES TANTO DE EVENTOS QUANTO DE EVENTOS QUE POSSUEM PRESENCA\\
                    ...evento,
                    possuiPresenca: presenca?.situacao === true, presencaID: presenca?.presencaEventoID || null

                }
            })


            setListaEventos(eventosComPresenca)
            console.log(resposta.data);

            console.log("Todos os meus eventos");
            console.log(todosOsEventos);

            console.log("Todos os meus eventos com presencas minhas");
            console.log(minhasPresencas);

            console.log("Todos os meus eventos com presenca");
            console.log(eventosComPresenca);

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        listarEventos();
        // console.log(usuario);
        
    }, [])

    function abrirModal(tipo, dados) {
        //tipo de modal // dados
        setModalAberto(true)
        setTipoModal(tipo)
        setDadosModal(dados)

    }

    function fecharModal() {
        setModalAberto(false);
        setDadosModal({});
        setTipoModal("");
    }

    async function manipularPresenca(eventoID, presenca, presencaID) {
        try {
            if (presenca && presencaID !="") {
                //atualizacao: situacao para FALSE
                await api.put(`presenca/${presencaID}`,{situacao:false});
                Swal.fire('Removido!','Sua presenca foi removida!.','success');

            } else if (presencaID !="") {
                //atualizacao: situacao para TRUE
                await api.put(`presenca/${presencaID}`,{situacao:true});
                Swal.fire('Confirmado!','sua presença foi confirmada','success');

            } else {
                //cadastrar uma nova presenca
                await api.post("presenca", {situacao:true, usuarioID: usuario.usuarioID, eventoID: eventoID});
                Swal.fire('Confirmado!','Sua presença foi confirmada!','success');

            }
        } catch (error) {
            console.log(error);

        }
    }

    function filtarEventos() {
        const hoje = new Date();
        return listaEventos.filter(evento => {
            const dataEvento = new Date(evento.dataEvento);

            if(filtroData.includes("todos")) return true;
            if(filtroData.includes("futuros") && dataEvento > hoje)
                return true;
            if(filtroData.includes("passados") && dataEvento < hoje)
                return true;

            return false;
        })
    }

    return (

        <>
            <Header
                nomeUsuario="Aluno"
                botaozinho="none"
            />

            <section className="sessao">
                <div className="layout_grid div_evento">
                    <h1>Eventos</h1>
                    <hr />

                    <div className="eventos_select">
                        <select name="eventos" onChange={(e) => setFiltroData([e.target.value])}>
                            <option value="todos" selected>Todos os Eventos</option>
                            <option value="futuros">Somente futuros</option>
                            <option value="passados">Somente passados</option>
                            <option value="">Oi</option>
                        </select>
                    </div>
                    <div className="tabela_eventos">
                        <table>
                            <thead>
                                <tr className="sub_eventos">
                                    <th>Título</th>
                                    <th>Data</th>
                                    <th>Tipo Evento</th>
                                    <th>Descrição</th>
                                    <th>Comentários</th>
                                    <th>Participar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaEventos.length > 0 ? (
                                    filtarEventos() && filtarEventos().map((item) => (
                                        <tr key={item.eventoID} className="itens_eventos">
                                            <td data-cell="Título">{item.nomeEvento}</td>
                                            <td data-cell="Data">{format(item.dataEvento, "dd/MM/yy")}</td>
                                            <td data-cell="Tipo Evento">{item.tipoEvento.tituloTipoEvento}</td>
                                            <td data-cell="Descrição"><img src={Descrito} alt="Bolinha" onClick={() => abrirModal("descricaoEvento", { descricao: item.descricao })} /></td>
                                            <td data-cell="Comentários"><img src={Balao} alt="Balao de texto" onClick={() => abrirModal("comentarios", { eventoID: item.eventoID })} /></td>
                                            <td> <label className="switch">
                                                <input type="checkbox" 
                                                checked={item.possuiPresenca}
                                                onChange={()=> manipularPresenca(item.eventoID, item.possuiPresenca, item.presencaID)}
                                                />
                                                <span className="slider"></span>

                                            </label></td>
                                            {/* <td data-cell="Participar"><Checkin /></td> */}
                                        </tr>
                                    ))
                                ) : (
                                    <p>sei não vui</p>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            {modalAberto && (
                <Modal

                    titulo={tipoModal == "descricaoEvento" ? "Descrição do Evento" : "Comentário"}
                    tipoModel={tipoModal}
                    eventoID={dadosModal.eventoID}
                    descricao={dadosModal.descricao}
                    fecharModal={fecharModal}

                />
            )}

            <Footer />
        </>
    )
}
export default Evento;