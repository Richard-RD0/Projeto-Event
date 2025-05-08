import "./Lista.css";
import Editar from "../../assents/img/lapis.png";
import Excluir from "../../assents/img/lixeira.png";



const Lista = (props) => {
    return(
        <>
        <section className="listagem">
            <h1>{`Lista de ${props.tituloLista}`}</h1>
            <hr className="linha_titulo" />
            


            <div className="tabela layout_grid">
                <table>
                    <thead>
                        <tr className="tabela_cabecalho">
                            <th className="left">{props.titulo}</th>
                            <th className="left"style={{display:props.visibilidade}}>Tipo Evento</th>                            
                            <th className="right">Editar</th>
                            <th className="right">Excluir</th>
                        </tr>
                    </thead>
                                {/* <hr className="divi" /> */}
                    <tbody>
                        <tr className="item_lista">
                            <td className="left" data-cell={props.titulo}>xxxxxxxxx</td>
                            <td className="left" data-cell="Tipo Evento" style={{display:props.visibilidade}} >xxxxxxxxx</td>
                            <td className="right"data-cell="Editar"><img src={Editar} alt="" /></td>
                            <td className="right" data-cell="Excluir"><img src={Excluir} alt="" /></td>

                        </tr>


                    </tbody>
                </table>
            </div>


        </section>
        
        </>
    )
}


export default Lista;