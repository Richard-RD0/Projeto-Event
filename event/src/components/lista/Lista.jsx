import "./Lista.css";

//importacao de imagens
import Editar from "../../assets/img/Vector (1).png";
import Excluir from "../../assets/img/Vector (2).png";
import Informacoes from "../../assets/img/informacoes 1.png";


const Lista = (props) => {
    return (
        <section className="layout_grid listagem">
            <h1>{props.tituloLista}</h1>
            <hr />
            <div className=" tabela">
                <table>
                    {/* cabeçalho da tabela: */}
                    <thead>
                        {/* tr => table row */}
                        <tr className="cabecalho_tabela">
                            {/* th => table head */}
                            <th>{props.titulo}</th>
                            <th style={{display: props.visibilidade}}>Data do Evento</th>
                            <th style={{ display: props.visibilidade }}>Tipo Evento</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>
                    {/* tbody => corpo da tabela */}
                    <tbody>
                        {props.lista && props.lista.length > 0 ? (
                            props.lista.map((item) => (
                                <tr className="item_lista" key={props.tipoLista === "TiposEventos" ? item.idTipoEvento : (props.tipoLista === "TiposUsuarios" ? item.idTipoUsuario : item.idEvento)}>
                                    <td data-cell="Nome">{props.tipoLista === "TiposEventos" ? item.tituloTipoEvento : (props.tipoLista === "TiposUsuarios" ? item.tituloTipoUsuario : item.nomeEvento)}</td>
                                    <td data-cell="Data">{item.dataEvento}</td>
                                    <td data-cell="Evento" style={{ display: props.visibilidade }}>{item.tiposevento?.tituloTipoEvento}</td>
                                    <td data-cell="Data do Evento" style={{display:props.visibilidade}}></td>
                                    <td data-cell="Editar"><img src={Editar} alt="Caneta" onClick={() => props.funcEditar(item)} /></td>
                                    <td data-cell="Excluir"><img src={Excluir} alt="Lixeira" onClick={() => props.deletar(item)} /></td>
                                    <td data-cell="Descrição"><img src={Informacoes} alt="I"/></td>
                                </tr>
                            ))
                        ) :
                            (
                                <p>Nenhum Tipo Evento foi encontrado.</p>
                            )
                        }

                    </tbody>
                </table>
            </div>

        </section>
    )
}

export default Lista;