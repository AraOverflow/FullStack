import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from './ProveedorContexto.jsx';
import './ResultadoArticulos.css';
import { useNavigate } from 'react-router-dom';
import { FormArticulo } from './FormArticulo.jsx';

export const ResultadoArticulos = () => {

    const [articulosState, setArticulosState] = useState([]);
    const [auth, useAuth] = useContext(AuthContext);
    const [editando, setEditando] = useState(false);
    const [articuloEdit, setArticuloEdit] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const resultados = async () => {
            try {
                const peticion = await fetch('http://localhost:1234/api/articulos',
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": auth.token
                        }
                    });

                const datos = await peticion.json();

                if (peticion.status == 404) {
                    navigate('/login');
                }
                else {
                    setArticulosState(datos);
                }
            } catch (e) {
                console.log(e);
            }
        }

        resultados();
    })

    const borrar = async (id) => {
        if (window.confirm("Esto borrará el articulo ¿Está seguro?")) {
            try {
                const peticion = await fetch('http://localhost:1234/api/articulos/' + id,
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": auth.token
                        }
                    });

                const datos = await peticion.json();

            } catch (e) {
                console.log(e);
            }
        }
    }

    const editar = async (articulo) => {
        setEditando(true);
        setArticuloEdit(articulo);
    }




    return (
        <>
            <table id="tabla">
                <thead>
                    <tr>
                        <th colSpan="7">Artículos</th>
                    </tr>
                    <tr>
                        <th>Título</th>
                        <th>Cuerpo</th>
                        <th>Usuario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {articulosState.map((articulo) => {
                        return (
                            <tr key={articulo._id}>
                                <td>{articulo.titulo}</td>
                                <td>{articulo.cuerpo}</td>
                                <td>{articulo.usuario}</td>
                                <td>  <i onClick={() => borrar(articulo._id)} className='delete'><span className="material-symbols-outlined">delete</span></i>
                                    <i onClick={() => editar(articulo)} className='edit'><span className="material-symbols-outlined">edit</span></i>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <FormArticulo articuloPadre={{ articuloEdit, editando }} />
        </>
    )
}
