import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Login} from "./Login.jsx";
import {Registro} from "./Registro.jsx";
import {Articulos} from "./Articulos.jsx";
import { ProveedorContexto } from './ProveedorContexto.jsx';

export const Rutas = () => {
  return (
    
    <BrowserRouter>
      <ProveedorContexto>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registro' element={<Registro />} />
          <Route path='/articulos' element={<Articulos />} />
          <Route path='*' element={<h1>ERROR NO EXISTE LA PAGINA, 404</h1>} />
        </Routes>
      </ProveedorContexto>
    </BrowserRouter>


  )
}

