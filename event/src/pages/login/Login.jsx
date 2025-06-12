import "./Login.css"

import api from "../../services/Services";
import Logo from "../../assets/img/Logo.svg"
import Botao from "../../components/botao/Botao"

import { useState } from "react";
import Swal from "sweetalert2";
import { userDecodeToken } from "../../auth/Auth";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router"

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();

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

        try {
            const usuario = {
                email: email,
                senha: senha
            }

            if (senha.trim() != "" || email.trim() != "") {
                try {
                    const resposta = await api.post("login", usuario);
                    const token = resposta.data.token;

                    if (token) {
                        // token será decodificado
                        const tokenDecodificado = userDecodeToken(token);

                        console.log("token decodificado:",);
                        console.log(tokenDecodificado.tipoUsuario);

                        secureLocalStorage.setItem("tokenLogin", JSON.stringify(tokenDecodificado));

                        if (tokenDecodificado.tipoUsuario === "Aluno") {
                            //redirecionar a tela de aluno(branca)
                            navigate("/Listagem")
                        } else {
                            //ela vai me encaminhar para tela de cadastro de eventos(verelho)
                            navigate("/Evento")
                        }
                    }
                } catch (error) {
                    console.log(error);
                    alertar("error", "Erro! Entre em contato com o suporte!");
                }
            } else {
                alertar("warning", "Preencha os campos vazios para realizar o login!")
            }


        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main className="main_login">

            <div className="banner">
                <div id="fundo_login" />
            </div>

            <section className="section_login">
                <img src={Logo} alt="Logo do Event" />

                <form action="" className="form_login" onSubmit={realizarAutenticacao}>

                    <div className="campos_login">
                        <div className="campo_input">
                            <input type="Email" name="email"
                                placeholder="Username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="campo_input">
                            <input type="PassWord" name="senha"
                                placeholder="PassWord"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </div>

                    </div>
                    <a href="">Esqueceu Sua Senha?</a>
                    <Botao botao="Login" />
                </form>
            </section>
        </main>
    )
}

export default Login;