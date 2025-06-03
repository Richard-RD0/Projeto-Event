import Logo from "../../assets/img/logo1.svg"
import Fundo from "../../assets/img/portaBranca.png"
import "./Login.css"
import Botao from "../../components/botao/Botao";

const Login = () => {
  return (
    <main className="main_login">
      <div className="banner">
        <img src={Fundo} alt="Fundo banner" />
      </div>

      <section className="section_login">
        <form action="" className="form_login">
          <img src={Logo} alt="Logo do projeto Event" />

          <div className="campos_login">
            <div className="campo_input">
              <label htmlFor="username"></label>
              <input type="username" name="username" placeholder="Username"></input>
            </div>
            <div className="campo_input">
              <label htmlFor="password"></label>
              <input type="password" name="password" placeholder="Password"></input>
            </div>
          </div>

          <a href="">Esqueceu a senha?</a>

          <Botao nomeDoBotao="Login" />

        </form>
      </section>

    </main>
  );
}

export default Login;