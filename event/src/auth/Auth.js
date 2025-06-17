import React from 'react';
import { jwtDecode } from "jwt-decode";

export const userDecodeToken = (token) => {
    const decodificado = jwtDecode(token);
    return{
        usuarioID: decodificado.jti,
        token: token,
        tipoUsuario: decodificado["tipo do usuário"]
        //
    }
}
