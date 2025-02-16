import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const Listar = () => {
    const urlBase = "http://localhost:8080/crud-app/empleados";
    const [empleados, setEmpleados] = useState([]);

    useEffect(() => {
        cargarEmpleados();
    }, []);

    const cargarEmpleados = async () => {
        const resultado = await axios.get(urlBase);
        console.log("resultado cargar empleados...");
        console.log(resultado.data);
        setEmpleados(resultado.data);
    }

    const borrarRegistros = async (id) => {
        await axios.delete(`${urlBase}/${id}`);
        cargarEmpleados();
    }
    
    
    if (!cargarEmpleados) {
        return <div>Cargando...</div>;
    }

    

    return (
        <div className='card'>
            <div className='card-header'>
                Listado de empleados
            </div>
            <div className='card-body'>
                    <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th>CORREO</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {empleados.map((empleado, index) => {
                        return (
                            <tr key={index}>
                                <td scope="row">{empleado.idEmpleado}</td>
                                <td>{empleado.nombre}</td>
                                <td>{empleado.correo}</td>
                                <td>
                                    <div className="btn-group" role="group" aria-label="Acciones">
                                        <Link className="btn btn-warning" to={"/editar/" + empleado.idEmpleado}>Editar</Link>
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => {
                                                if (window.confirm("¿Estás seguro de que deseas borrar este registro?")) {
                                                    borrarRegistros(empleado.idEmpleado);
                                                } else {
                                                    return false;
                                                }
                                            }}
                                        >Borrar</button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        <div className='card-footer text-muted'>
        </div>
    </div>
    );
}

export default Listar;
