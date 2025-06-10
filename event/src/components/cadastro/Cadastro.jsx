
import "./Cadastro.css";
import Botao from "../botao/Botao";

const Cadastro = (props) => {
    return (
        <section className="layout_grid section_cadastro">
            <div  className="cadastro_titulo">
                <h1>{props.tituloCadastro}</h1>
                <hr />
            </div>

            <form  onSubmit={props.funcCadastro} className="form_cadastro">

                <div className="img_cadastro">
                    <img src={props.banner_img} alt="Imagem do Cadastro" />
                </div>

                <div className="campos_cadastro">
                    <div className="campo_cad_nome">
                        <input value={props.valorInput} 
                        type="text" 
                        placeholder={props.campoPlaceholder}    
                        onChange={(e) => props.setValorInput(e.target.value)}
                        />
                    </div>

                <div className="campo_cad_data" style={{display: props.visibilidade}}>
                    <input type="date" 
                    value = {props.valorDate}
                    onChange={(e) => props.setValorDate(e.target.value)}
                    placeholder="Data do Evento"
                    />

                </div>

                    <div className="campo_cad_tipoevento" style={{ display: props.visibilidade }}>
                        <label htmlFor="Nome"></label>
                            <select name="Tipo De Evento" id=""
                                value={props.valorSelect}
                                onChange={(e) => props.setValorSelect(e.target.value)}
                            >

                                <option value="" disabled selected>Tipo de Evento</option>
                                {props.lista && props.lista.length > 0 && props.lista.map((item) => (
                                    (
                                        <option value={item.idTipoEvento}>{item.tituloTipoEvento}</option>
                                    ))
                                )}
                            </select>
                    </div>

                    <div className="campo_cad_instituicao" style={{display:props.visibilidade}}>
                        <select name="" id=""
                            value={props.valorSelect2}
                            onChange={(e) => props.setValorText(e.target.value)}
                            >
                            <option selected disabled value="">WorldSKills</option>
                        </select>
                    </div>

                    <div className="campo_cad_descricao" style={{display: props.visibilidade}}>
                        <textarea name="" id="" placeholder="Descrição"
                        value={props.valorText}
                        onChange={(e) => props.setValorText(e.target.value)} ></textarea>                            
                    </div>
                    
                    <Botao nomeDoBotao={props.NomeDoBotao} />
                </div>
            </form>
        </section>
    )
}

export default Cadastro;