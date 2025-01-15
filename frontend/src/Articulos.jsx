import React, { useContext } from 'react'
import { AuthContext } from './ProveedorContexto.jsx'
import { ResultadoArticulos } from './ResultadoArticulos.jsx'
import { Login } from './Login.jsx'
import './Articulos.css'

export const Articulos = () => {
  const [usuarioAuth, setUsuarioAuth] = useContext(AuthContext)
  return (
    <>
      <div id='elementos'>
        {usuarioAuth == null ? <Login /> : <ResultadoArticulos />}
      </div>
    </>
  )
}
