import "./Login.css";
import Logo from "../../assets/img/logo.svg"
import Botao from "../../components/botao/Botao";
import { useEffect, useState } from "react";
import api from "../../Services/services";
import Swal from "sweetalert2";
import { userDecodeToken } from "../../auth/Auth";
import  secureLocalStorage  from  "react-secure-storage";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
const Login = () => {

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const navigate = useNavigate();

    const {setUsuario} = useAuth();

    function alertar(icone, mensagem) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: icone,
                title: mensagem
            });
        }

    async function realizarAutenticacao(e) {
        e.preventDefault();

        const usuario = {
            email: email,
            senha: senha
        }
        if (senha.trim() != "" || email.trim() != "") {
            try {
                const resposta = await api.post("login", usuario)
                const token = resposta.data.token
                if(token){
                    //token será decodificado
                    const tokenDecodificado = userDecodeToken(token)

                    setUsuario(tokenDecodificado);



                    secureLocalStorage.setItem("tokenLogin", JSON.stringify(tokenDecodificado));
                    if(tokenDecodificado.tipoUsuario === "Aluno"){
                        // redirect(<Evento/>);
                        navigate("/Cadastroevento")
                    } else {
                        navigate("/Evento")
                    }

                    // console.log(tokenDecodificado);

                }
                // console.log(resposta.data.token);
                
                alertar("success","Autenticado com sucesso!")
            } catch (error) {
                console.log(error);
               alertar("error","Email ou senha inválidos, para dúvidas, entre em contato com o suporte")
            }
        } else {
            alertar("error","Preencha os campos vazios para realizar o login seu dedin nervoso")
        }

    }

    return (
        <main className="main_login">

            <link rel="stylesheet" href="https://use.typekit.net/pam4ubo.css"></link>

            <div className="banner"></div>

            <section className="section_login">

                <img className="bigger" src={Logo} alt="Event+" />

                <form action="" className="form_login" onSubmit={realizarAutenticacao}>

                    <div className="campos_login">

                        <div className="campos_input">
                            <input type="email" placeholder="Username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="campos_input">
                            <input type="password" placeholder="Password"
                                value={senha} //love´s sorrow (liesbesleid)
                                onChange={(e) => setSenha(e.target.value)} />
                        </div>

                        <p>Esqueceu a senha?</p>

                    </div>
                    <Botao nomeDoBotao="Login" />
                </form>
            </section>
        </main>
    )
}
export default Login;