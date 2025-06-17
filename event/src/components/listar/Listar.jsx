import "./Listar.css"
import Lixinho from "../../assets/img/Lixo.png"
import Lapizinho from "../../assets/img/Lapis.png"
import Descrito from "../../assets/img/Descrever.png"
const Listar = (props) => {
    return (
        <>
            <section className="listagem">
                <div className="layout_grid div_tabela">
                    <h1>{props.tituloLista}</h1>
                    <hr />

                    <div className="tabela">
                        <table>
                            <thead>
                                <tr className="table_cabecalho">
                                    <th>{props.nomezin}</th>
                                    <th style={{ display: props.visible }}>Data</th>
                                    <th style={{ display: props.visible }}>TipoEvento</th>
                                    <th>{props.edit}</th>
                                    <th style={{ display: props.visibly }}>Excluir</th>
                                    <th style={{ display: props.visible }}>Descrição</th>
                                    {/* <th id="sim" style={{display:props.acao}}>Ações</th> */}
                                </tr>
                            </thead>
                            <tbody> {/*Corpo da tabela*/}
                                {/*A parte de listagem se encontra aqui*/}
                                {props.lista && props.lista.length > 0 ? (
                                    props.lista.map((item) => (
                                        console.log(item),
                                        //Use console.log(item), para identificar o nome do id certinho caso esteja dando erro na requisição(é uma das possíveis soluções)

                                        <tr className="item_lista"

                                            key={
                                                props.tipoLista === "tipoEvento"
                                                    ? item.tipoEvento?.tipoEventoID
                                                    : props.tipoLista === "evento"
                                                        ? item.nomeEvento
                                                        : item.nome // ou outro identificador seguro
                                            }>


                                            <td data-cell={props.nomezin}>
                                                {
                                                    props.tipoLista === "tipoEvento"
                                                        ? item.tituloTipoEvento
                                                        : props.tipoLista === "evento"
                                                            ? item.nomeEvento
                                                            : item.tituloTipoUsuario ?? item.nome
                                                }
                                                {/*Nome dos Eventos / Nome dos Usuarios*/}
                                                {/* {props.tipoLista == "evento" ? item.nomeEvento : item.nome} */}
                                                {/* props.tipoLista == "tipoEvento" ? item.TituloTipoEvento : props.tipoLista == "TipoUsuario"?item.TituloTipoUsuario : props.tipoLista == "evento" ? item.NomeEvento */}

                                            </td>

                                            <td style={{ display: props.visible }} data-cell="Data">{item.dataEvento}</td>

                                            <td style={{ display: props.visible }} data-cell="TipoEvento">{item.tipoEvento?.tituloTipoEvento}</td>

                                            <td data-cell="Editar Ações">
                                                <img src={Lapizinho} alt="lapizin" onClick={() => props.editar(item)} style={{ cursor: "pointer" }} />
                                            </td>

                                            <td data-cell="Excluir Ações">
                                                <img src={Lixinho} alt="lixin" onClick={() => props.delet(props.tipoLista == "tipoEvento" ? item.tipoEventoID : item.tipoUsuarioID)} style={{ cursor: "pointer" }} />
                                            </td>

                                            <td style={{ display: props.visible }} data-cell="Descrição">
                                                <img src={Descrito} alt="Descrição" />
                                            </td>

                                        </tr>
                                    ))
                                ) :
                                    (
                                        <p>não estou entendendo</p>
                                    )}
                                {/* <tr className="item_lista">
                                    <td data-cell={props.nomezin}>Senai</td>
                                    <td style={{ display: props.visible }} data-cell="TipoEvento">Gigachads</td>
                                    <td data-cell="Editar Ações"><img src={Lapizinho} alt="lapizin" /></td>
                                    <td data-cell="Excluir Ações"><img src={Lixinho} alt="lixin" /></td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>

                </div>
            </section>
        </>
    )
}
export default Listar;
