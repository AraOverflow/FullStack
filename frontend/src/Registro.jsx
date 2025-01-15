import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "./Registro.css";


export const Registro = () => {
    const [formulario, setFormulario] = useState({});
    const [exitoReg, setExitoReg] = useState(false);
    const [errorReg, setErrorReg] = useState(false);
    const navigate = useNavigate();

    const recogerForm = (e) => {

        e.preventDefault();
        setErrorReg(false);
        setExitoReg(false);

        let usuario =
        {
            nick: e.target.usuario.value,
            mail: e.target.mail.value,
            password: e.target.password.value
        }

        setFormulario(usuario);

        guardarUsuario(usuario);
    }

    const guardarUsuario = async (usuario) => {

        try {
            const peticion = await fetch('http://localhost:1234/api/usuarios',
                {
                    method: "POST",
                    body: JSON.stringify(usuario),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

            const datos = await peticion.json();

            if(datos.status == 400){
                setExitoReg(false);
                setErrorReg(true);
            }
            else{
                setExitoReg(true);
                setErrorReg(false);
            }
        }
        catch (e) {
            console.log(e);
            setFormulario({});
        }


    }

    return (
        <>
            <h2>{exitoReg ? navigate("/login") : ""}</h2>
            <h2 style={{ color: "red" }}>{errorReg ? "EL USUARIO YA ESTABA REGISTRADO" : ""}</h2>
            <div className="screen-1">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,400,0,0" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
                <svg className="logo" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="300" height="300" viewBox="0 0 640 480" xmlSpace="preserve">
                    <g transform="matrix(3.31 0 0 3.31 320.4 240.4)">
                        <circle style={{ stroke: "rgb(0, 0, 0)", strokeWidth: "0", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(61, 71, 133)", fillRule: "nonzero", opacity: "1" }} cx="0" cy="0" r="40"></circle>
                    </g>
                    <g transform="matrix(0.98 0 0 0.98 268.7 213.7)">
                        <circle style={{ stroke: "rgb(0, 0, 0)", strokeWidth: "0", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(255, 255, 255)", fillRule: "nonzero", opacity: "1" }} cx="0" cy="0" r="40"></circle>
                    </g>
                    <g transform="matrix(1.01 0 0 1.01 362.9 210.9)">
                        <circle style={{ stroke: "rgb(0, 0, 0)", strokeWidth: "0", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokemiterlimit: "4", fill: "rgb(255, 255, 255)", fillRule: "nonzero", opacity: "1" }} cx="0" cy="0" r="40"></circle> </g>
                    <g transform="matrix(0.92 0 0 0.92 318.5 286.5)">
                        <circle style={{ stroke: "rgb(0, 0, 0)", strokeWidth: "0", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(255, 255, 255)", fillRule: "nonzero", opacity: "1" }} cx="0" cy="0" r="40"></circle>
                    </g>
                    <g transform="matrix(0.16 -0.12 0.49 0.66 290.57 243.57)">
                        <polygon style={{ stroke: "rgb(0, 0, 0)", strokeWidth: "0", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(255, 255, 255)", fillRule: "nonzero", opacity: "1" }} points="-50,-50 -50,50 50,50 50,-50 "></polygon>
                    </g>
                    <g transform="matrix(0.16 0.1 -0.44 0.69 342.03 248.34)">
                        <polygon style={{ stroke: "rgb(0, 0, 0)", strokeWidth: "0", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(255, 255, 255)", fillRule: "nonzero", opacity: "1" }} vectorEffect="non-scaling-stroke" points="-50,-50 -50,50 50,50 50,-50 "></polygon>
                    </g>
                </svg>
                <form onSubmit={recogerForm}>
                    <div className="usuario">
                        <label htmlFor='usuario'>Usuario</label>
                        <div className="sec-2">
                            <span className="material-symbols-outlined"> account_circle </span>
                            <input type='text' name='usuario' id='usuario' placeholder='Usuario' />
                        </div>
                    </div>
                    <div className="mail">
                        <label htmlFor='mail'>E-mail</label>
                        <div className="sec-2">
                            <span className="material-symbols-outlined"> lock </span>
                            <input type='email' name='mail' id='mail' placeholder='E-mail' />
                        </div>
                    </div>
                    <div className="password">
                        <label htmlFor='password'>Password</label>
                        <div className="sec-2">
                            <span className="material-symbols-outlined"> lock </span>
                            <input type='password' name='password'  autoComplete='on' id='password' placeholder='············' /> </div> </div>
                    <input className="registro" type='submit' />
                    <div className="footer">
                        <span><NavLink to='/login'>Ya tengo una cuenta</NavLink></span>
                    </div>
                </form>
            </div> </>
    )
}
