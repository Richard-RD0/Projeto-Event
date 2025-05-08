import Logo from "../../assets/img/logo1.svg";
import Botao from "../../components/botao/Botao";
import Primeira from "../../assets/img/primeiraimg.svg"
import "./Login.css";

const Login = () => {
  return (
    <main className="main-login">
      <div className="login-direito">
    
    
        <div className="login-esquerdo">
        <div className="foto">
          <img src={Primeira} alt="Event+" />
        </div>
        </div>
      </div>
      <div className="login-right">
        <img src={Logo} alt="Logo do Event" className="logo-event"/>
        <form className="form_login">
          <div className="campos_login">
            <input type="text" placeholder="Username" name="username"/>
            <input type="password" placeholder="Senha" name="Senha"/>
          </div>
          <a href="/" className="Senha-esquecida">Esqueceu a senha?</a>
          <Botao nomeDoBotao="Login"/>
        </form> 
      </div> 
    </main>
  )
  
};

export default Login;
