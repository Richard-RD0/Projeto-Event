import "./Cadastro.css";
import Botao from "../botao/Botao";
// import img from "../../assets/img"

const Cadastro = (props) => {
    return (
        <main className="main_cadastro">
            <div className="titulo">
                <h1>{props.tituloCadastro}</h1>
                <hr />
            </div>

            <section className="section_cadastro">
                <div className="banner_cadastro">
                    <img src={props.img} alt="Fundo banner do cadastro eventos" />
                </div>

                <form onSubmit={props.funcCadastro} className="layout_grid form_cadastro">

                    <div className="campos_cadastro">
                        <div className="campo_cad_titulo">

                            <input type="text" name="nome"
                                placeholder={`${props.botaoNome}`}
                                value={props.valorInput}
                                onChange={(e) => props.setValorInput(e.target.value)} />
                        </div>
                        <div className="campo_cad_data">
                            <input type="date"
                                style={{ display: props.data }}
                                value={props.valorDate}
                                onChange={(e) => props.setValorDate(e.target.value)} />
                        </div>
                        <div className="campo_cad_evento" style={{ display: props.visibilidade }}>
                            <label htmlFor="tipo evento">Tipo Evento</label>
                            <select name="tipo evento" id=""
                                value={props.valorSelect}
                                onChange={(e) => props.setValorSelect(e.target.value)}
                            >
                                <option value="" disabled selected>Tipo Evento</option>
                                {props.lista && props.lista.length > 0 && props.lista.map((itemTipoEvento) => (
                                    (
                                        <option value={itemTipoEvento.idTipoEvento}>{itemTipoEvento.tituloTipoEvento}</option>
                                    ))
                                )}
                            </select>
                        </div>
                        <div className="campo_cad_instituicao" style={{ display: props.visibilidade }}>
                            <label htmlFor="instituicao">Instituicao</label>
                            <select name="instituicao" id=""
                                value={props.valorSelectInstituicao}
                                onChange={(e) => props.setValorSelectInstituicao(e.target.value)}
                            >
                                <option value="" disabled selected>Instituição</option>
                                {props.lista && props.lista.length > 0 && props.lista.map((itemInstituicao) => (
                                    (
                                        <option value={itemInstituicao.idInstituicao}>{`${itemInstituicao.NomeFantasia} - ${itemInstituicao.Endereco} - CNPJ: ${itemInstituicao.CNPJ}`}</option>
                                    ))
                                )}

                            </select>
                        </div>
                        <div className="campo_cad_data" style={{ display: props.visibilidade }}>
                            <textarea name="" id="" placeholder="Descrição" className="descricao"
                                style={{ display: props.desc }}
                                value={props.valorText}
                                onChange={(e) => props.setValorText(e.target.value)}
                            ></textarea>
                        </div>

                        <Botao nomeDoBotao="Cadastrar" />
                    </div>
                </form>
            </section>
        </main>
    )
}

export default Cadastro;