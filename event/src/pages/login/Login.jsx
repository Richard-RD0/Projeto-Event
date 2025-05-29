import Logo from "../../assets/img/logo1.svg";
import "./Login.css";
import Botao from "../../components/botao/Botao";



const Login = () => {
    return(
        <main className= "main_login">
           <div className="banner"></div>
           <section className="section_login">
            <img src={Logo} alt="Logo do EventPlus" />
            <form action="" className="form_login">
                <div className="campos_login">
                    <div className="campo_input">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" placeholder="Digite seu e-mail"/>
                    </div>
                    <div className="campo_input">
                        <label htmlFor="senha">Senha:</label>
                        <input type="password" name="senha" placeholder="Digite sua senha"/>
                    </div>
                </div>
                    <a href="#">Esqueceu a senha?</a>
            </form>
                <Botao nomeDoBotao="Login"/>
           </section>
        </main>
    )
}

export default Login;