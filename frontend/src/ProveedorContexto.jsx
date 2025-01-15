import {React, createContext, useEffect, useState} from 'react';

export const AuthContext = createContext();

export const ProveedorContexto = (props) => {

    const [usuarioAuth, setUsuarioAuth] = useState(null);
    
    const usrStorage = () => {
        const usuario = localStorage.getItem("usuario");

        if (!usuario)
            return false;

        setUsuarioAuth(JSON.parse(usuario));}

    useEffect(()=>{   
        usrStorage()
    },[])

    return (
    <AuthContext.Provider value={[usuarioAuth,usrStorage]}>
        {props.children}
    </AuthContext.Provider>
  )
}
